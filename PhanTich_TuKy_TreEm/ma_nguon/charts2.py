import os as _os
_HERE=_os.path.dirname(_os.path.abspath(__file__))
_ROOT=_os.path.dirname(_HERE)
import matplotlib; matplotlib.use('Agg')
import matplotlib.pyplot as plt, pandas as pd, numpy as np, os
OUT=_os.path.join(_ROOT,"bieu_do"); _os.makedirs(OUT,exist_ok=True)
df=pd.read_csv(_os.path.join(_ROOT,"du_lieu","asd_treEm_CLEANED.csv"))
raw=pd.read_csv(_os.path.join(_ROOT,"du_lieu","asd_treEm_GOC.csv"))

SURF="#ffffff"; INK="#0b0b0b"; SEC="#52514e"; MUT="#898781"; GRID="#e1e0d9"; BASE_="#c3c2b7"
RAMP=["#86b6ef","#5598e7","#2a78d6","#1c5cab","#104281"]
BLUE="#2a78d6"; RED="#d03b3b"; AQUA="#1baf7a"; AMBER="#EDA100"
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':12,'figure.facecolor':SURF,
 'axes.facecolor':SURF,'savefig.facecolor':SURF,'axes.edgecolor':BASE_,'text.color':INK,
 'axes.labelcolor':SEC,'xtick.color':MUT,'ytick.color':MUT})
def vn(x,d=1):
    t=f"{x:,.{d}f}"; return t.replace(","," ").replace(".",",").replace(" ",".")
def vni(x): return f"{int(x):,}".replace(",",".")
def style(ax,yg=True,xg=False):
    for s in ['top','right']: ax.spines[s].set_visible(False)
    for s in ['left','bottom']: ax.spines[s].set_color(BASE_); ax.spines[s].set_linewidth(.8)
    if yg: ax.yaxis.grid(True,color=GRID,lw=.8,zorder=0)
    if xg: ax.xaxis.grid(True,color=GRID,lw=.8,zorder=0)
    ax.set_axisbelow(True); ax.tick_params(length=0)
def save(f,n): f.savefig(f"{OUT}/{n}.png",dpi=200,bbox_inches='tight',pad_inches=.25); plt.close(f); print("saved",n)

# ---- D1: 7 bien "roi loan di kem" la ban sao cua nhau ----
C=['ChamNoi','KhoHoc','ChamPTTT','VanDeHanhVi','LoAu','TramCam','RoiLoanGen']
L=['Chậm nói','Khó học','Chậm PT trí tuệ','Vấn đề hành vi','Lo âu','Trầm cảm','Rối loạn gen']
M=df[C].corr().values
fig,ax=plt.subplots(figsize=(8.2,6.4))
im=ax.imshow(M,cmap='Reds',vmin=0.8,vmax=1.0)
for i in range(7):
    for j in range(7):
        ax.text(j,i,vn(M[i,j],2),ha='center',va='center',fontsize=11,fontweight='bold',
                color="#ffffff" if M[i,j]>0.95 else INK)
ax.set_xticks(range(7)); ax.set_xticklabels(L,rotation=35,ha='right',fontsize=10.5)
ax.set_yticks(range(7)); ax.set_yticklabels(L,fontsize=10.5)
for s in ax.spines.values(): s.set_visible(False)
ax.tick_params(length=0)
ax.set_title("Lỗi dữ liệu 1: bảy biến “rối loạn đi kèm” chỉ là bản sao của nhau",
             fontsize=13,fontweight='bold',color=INK,pad=14,loc='left')
ax.text(0,-0.33,"Tương quan 0,88–1,00 giữa các chẩn đoán lẽ ra phải độc lập · 95,3% trẻ hoặc có cả 7 hoặc không có cái nào",
        transform=ax.transAxes,fontsize=10,color=MUT)
save(fig,"d1_copy")

# ---- D2: ro ri nhan (AQ -> ASD) ----
ct=pd.crosstab(df.AQ_total,df.ASD)
fig,ax=plt.subplots(figsize=(10.2,5.0))
x=np.arange(11); w=0.4
b1=ax.bar(x-w/2,ct[0].reindex(range(11),fill_value=0),w,color=AQUA,label='Nhãn: Không có dấu hiệu ASD',zorder=3)
b2=ax.bar(x+w/2,ct[1].reindex(range(11),fill_value=0),w,color=RED,label='Nhãn: Có dấu hiệu ASD',zorder=3)
ax.axvline(3.5,color=INK,lw=1.6,ls='--',zorder=4)
ax.text(3.62,165,"Ngưỡng cứng AQ = 4\nKhông một ngoại lệ nào",fontsize=11,fontweight='bold',color=INK,va='top')
style(ax); ax.set_xticks(x); ax.set_ylim(0,185)
ax.set_xlabel("Tổng điểm sàng lọc AQ (0–10)",color=SEC); ax.set_ylabel("Số trẻ",color=SEC)
ax.legend(frameon=False,fontsize=11,loc='upper right')
ax.set_title("Lỗi dữ liệu 2: nhãn ASD được suy ra từ chính điểm sàng lọc",
             fontsize=13.5,fontweight='bold',color=INK,pad=14,loc='left')
ax.text(0,-0.17,"Mọi trẻ có AQ ≥ 4 đều bị gán nhãn “có ASD” · dùng AQ để dự báo ASD là lập luận vòng tròn",
        transform=ax.transAxes,fontsize=10,color=MUT)
save(fig,"d2_leak")

# ---- D3: tuoi sang loc (INSIGHT CHINH) ----
fig,ax=plt.subplots(figsize=(10.4,5.0))
cnt=df.Age_Years.value_counts().sort_index()
cols=[RED if a<=3 else (AMBER if a<=6 else BLUE) for a in cnt.index]
ax.bar(cnt.index,cnt.values,color=cols,width=.72,zorder=3)
ax.axvspan(0.4,3.5,color=RED,alpha=.07,zorder=1)
ax.axvspan(3.5,6.5,color=AMBER,alpha=.07,zorder=1)
ax.axvspan(6.5,18.6,color=BLUE,alpha=.05,zorder=1)
for xc,pct,lb,col in [(2,"10,4%","1–3 tuổi",RED),
                      (5,"19,2%","4–6 tuổi","#A86F00"),
                      (12.5,"70,4%","7–18 tuổi",BLUE)]:
    ax.text(xc,322,pct,ha='center',va='top',fontsize=19,fontweight='bold',color=col)
    ax.text(xc,288,lb,ha='center',va='top',fontsize=10.5,color=col,linespacing=1.4)
style(ax); ax.set_xticks(range(1,19)); ax.set_ylim(0,330)
ax.set_xlabel("Tuổi của trẻ khi được sàng lọc",color=SEC); ax.set_ylabel("Số trẻ",color=SEC)
ax.set_title("Phát hiện chính: sàng lọc diễn ra quá muộn so với cửa sổ can thiệp",
             fontsize=13.5,fontweight='bold',color=INK,pad=14,loc='left')
ax.text(0,-0.135,"Vùng đỏ = cửa sổ can thiệp vàng · vùng vàng = trước tiểu học · vùng xanh = đã quá muộn để can thiệp sớm\nTuổi trung vị khi sàng lọc: 8 · N = 1.329 trẻ",
        transform=ax.transAxes,fontsize=10,color=MUT,linespacing=1.5,va='top')
save(fig,"d3_age")

# ---- D4: kenh sang loc + khoang cach gioi ----
fig,axes=plt.subplots(1,2,figsize=(12.6,4.5))
w=df.Who_completed_the_test.value_counts()
lab={'Health Care Professional':'Nhân viên y tế','Family Member':'Người nhà',
     'School And Ngo':'Trường học / NGO','Self':'Tự làm','Others':'Khác'}
nm=[lab.get(i,i) for i in w.index]; pc=w.values/len(df)*100
cols=[BLUE]*len(w); cols[list(w.index).index('School And Ngo')]=RED
b=axes[0].barh(nm[::-1],pc[::-1],color=cols[::-1],height=.6,zorder=3)
for i,(v,c) in enumerate(zip(pc[::-1],w.values[::-1])):
    axes[0].text(v+1,i,f"{vn(v)}%  (n={vni(c)})",va='center',fontsize=11,fontweight='bold',color=INK)
style(axes[0],yg=False,xg=True); axes[0].set_xlim(0,78)
axes[0].set_xlabel("Tỷ lệ số lần sàng lọc (%)",color=SEC)
axes[0].set_title("Trường học gần như vắng mặt: chỉ 0,8%",fontsize=12.5,fontweight='bold',color=INK,pad=12,loc='left')
asd=df[df.ASD==1]
med=asd.groupby('Sex').Age_Years.median()
b=axes[1].bar(['Bé trai','Bé gái'],[med['M'],med['F']],color=[BLUE,RED],width=.46,zorder=3)
for r,v in zip(b,[med['M'],med['F']]):
    axes[1].text(r.get_x()+r.get_width()/2,v+.22,f"{vn(v,0)} tuổi",ha='center',fontsize=14,fontweight='bold',color=INK)
axes[1].annotate("",xy=(1,10.7),xytext=(0,10.7),arrowprops=dict(arrowstyle='<->',color=MUT,lw=1.4))
axes[1].text(.5,10.9,"chậm hơn 2 năm",ha='center',fontsize=11.5,fontweight='bold',color=SEC)
style(axes[1]); axes[1].set_ylim(0,12.4); axes[1].set_ylabel("Tuổi trung vị khi phát hiện",color=SEC)
axes[1].set_title("Bé gái được phát hiện muộn hơn (tỷ lệ nam:nữ 3,58:1)",fontsize=12.5,fontweight='bold',color=INK,pad=12,loc='left')
fig.tight_layout(); save(fig,"d4_pathway")

# ---- D5: suc manh tung muc + muc A10 hong ----
A=[f'A{i}' for i in range(1,10)]+['A10_Autism_Spectrum_Quotient']
non=df[df.ASD==0]
d=[(c.replace('_Autism_Spectrum_Quotient',''), asd[c].mean()*100-non[c].mean()*100) for c in A]
d=sorted(d,key=lambda z:z[1])
fig,ax=plt.subplots(figsize=(9.4,5.0))
cols=[RED if n=='A10' else BLUE for n,_ in d]
ax.barh([n for n,_ in d],[v for _,v in d],color=cols,height=.62,zorder=3)
for i,(n,v) in enumerate(d):
    ax.text(v+1,i,f"{vn(v)} điểm %",va='center',fontsize=11,fontweight='bold',color=INK)
style(ax,yg=False,xg=True); ax.set_xlim(0,66)
ax.set_xlabel("Chênh lệch tỷ lệ trả lời “có” giữa nhóm ASD và nhóm không ASD",color=SEC)
ax.set_title("Chất lượng công cụ: 9 mục phân biệt tốt, riêng mục A10 hỏng",
             fontsize=13.5,fontweight='bold',color=INK,pad=14,loc='left')
ax.text(0,-0.16,"A10 chỉ chênh 13,1 điểm % trong khi 9 mục còn lại trung bình 49,1 — cần rà soát lại mục này",
        transform=ax.transAxes,fontsize=10,color=MUT)
save(fig,"d5_items")
print("\nDONE")
