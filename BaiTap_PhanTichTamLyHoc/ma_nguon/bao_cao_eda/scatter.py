import matplotlib; matplotlib.use('Agg')
import matplotlib.pyplot as plt, pandas as pd, numpy as np
OUT="/tmp/claude-0/-home-user-about/7f9787d4-c743-5828-973b-7494043f4138/scratchpad/eda/img"
df=pd.read_csv("/home/user/about/BaiTap_PhanTichTamLyHoc/du_lieu/student_depression_GOC.csv")
SURF="#ffffff";INK="#0b0b0b";SEC="#52514e";MUT="#898781";GRID="#e1e0d9";BASE_="#c3c2b7"
BLUE="#2a78d6";RED="#d03b3b";AQUA="#1baf7a"
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':11,'figure.facecolor':SURF,
 'axes.facecolor':SURF,'savefig.facecolor':SURF,'axes.edgecolor':BASE_,'text.color':INK,
 'axes.labelcolor':SEC,'xtick.color':MUT,'ytick.color':MUT})
def vn(x,d=1):
    t=f"{x:,.{d}f}"; return t.replace(",","\x00").replace(".",",").replace("\x00",".")
def st(ax,yg=True,xg=True):
    for s in ['top','right']: ax.spines[s].set_visible(False)
    for s in ['left','bottom']: ax.spines[s].set_color(BASE_); ax.spines[s].set_linewidth(.8)
    if yg: ax.yaxis.grid(True,color=GRID,lw=.8,zorder=0)
    if xg: ax.xaxis.grid(True,color=GRID,lw=.8,zorder=0)
    ax.set_axisbelow(True); ax.tick_params(length=0)
def sv(f,n): f.savefig(f"{OUT}/{n}.png",dpi=190,bbox_inches='tight',pad_inches=0.2); plt.close(f); print("saved",n)

# ── E5: scatter CGPA × Tuổi, màu theo trầm cảm ──
d=df[(df.CGPA>0)].copy()
rng=np.random.default_rng(42)
s=d.sample(6000,random_state=42)        # lấy mẫu để tránh vón cục
jx=rng.normal(0,.045,len(s)); jy=rng.normal(0,.22,len(s))   # nhiễu nhỏ cho biến rời rạc
fig,ax=plt.subplots(figsize=(9.6,5.4))
for val,col,lab in [(0,AQUA,'Không có dấu hiệu trầm cảm'),(1,RED,'Có dấu hiệu trầm cảm')]:
    m=s.Depression==val
    ax.scatter(s.CGPA[m]+jx[m.values],s.Age[m]+jy[m.values],s=9,c=col,alpha=.28,
               linewidths=0,label=lab,zorder=3)
st(ax); ax.set_xlabel("Điểm CGPA",color=SEC); ax.set_ylabel("Tuổi",color=SEC)
ax.set_xlim(4.6,10.4); ax.set_ylim(16,46)
lg=ax.legend(frameon=False,fontsize=11,loc='upper right',markerscale=2.6)
for h in lg.legend_handles: h.set_alpha(1)
ax.set_title("Điểm CGPA không tách được hai nhóm — hai màu trộn đều khắp biểu đồ",
             fontsize=13,fontweight='bold',color=INK,loc='left',pad=12)
ax.text(0,-0.135,"Mẫu ngẫu nhiên 6.000 sinh viên · đã thêm nhiễu nhỏ để tránh chồng điểm · r(CGPA, trầm cảm) = +0,022",
        transform=ax.transAxes,fontsize=10,color=MUT)
sv(fig,"e5_scatter_cgpa")

# ── E6: scatter cấp thành phố ──
vc=df.City.value_counts(); keep=vc[vc>=100].index
g=df[df.City.isin(keep)].groupby('City')['Depression'].agg(['mean','count'])
g['mean']*=100
fig,ax=plt.subplots(figsize=(9.6,5.4))
ax.scatter(g['count'],g['mean'],s=64,c=BLUE,alpha=.78,linewidths=1.1,edgecolors=SURF,zorder=3)
mu=df.Depression.mean()*100
ax.axhline(mu,color=RED,lw=1.6,ls='--',zorder=4)
ax.text(g['count'].min()*0.96,mu+.72,f"Trung bình toàn mẫu {vn(mu)}%",ha='left',
        fontsize=11,fontweight='bold',color=RED)
for c in [g['mean'].idxmax(),g['mean'].idxmin(),g['count'].idxmax()]:
    dx,dy,ha = (-10,4,'right') if c==g['count'].idxmax() else (0,11,'center')
    ax.annotate(c,(g.loc[c,'count'],g.loc[c,'mean']),textcoords="offset points",
                xytext=(dx,dy),ha=ha,fontsize=10,fontweight='bold',color=INK)
st(ax); ax.set_xlabel("Số sinh viên được khảo sát tại thành phố",color=SEC)
ax.set_ylabel("Tỷ lệ trầm cảm (%)",color=SEC)
ax.set_title("Tỷ lệ trầm cảm khá đồng đều giữa các thành phố — không có thành phố nào cá biệt",
             fontsize=13,fontweight='bold',color=INK,loc='left',pad=12)
ax.text(0,-0.135,f"{len(g)} thành phố có từ 100 bản ghi trở lên · khoảng tỷ lệ {vn(g['mean'].min())}% – {vn(g['mean'].max())}%",
        transform=ax.transAxes,fontsize=10,color=MUT)
sv(fig,"e6_scatter_city")
print(f"\nSo thanh pho: {len(g)} | khoang {g['mean'].min():.1f}-{g['mean'].max():.1f}%")
print(f"cao nhat: {g['mean'].idxmax()} {g['mean'].max():.1f}% | thap nhat: {g['mean'].idxmin()} {g['mean'].min():.1f}%")
print(f"do lech chuan giua cac thanh pho: {g['mean'].std():.2f} diem %")
