import matplotlib; matplotlib.use('Agg')
import matplotlib.pyplot as plt, pandas as pd, numpy as np, os
OUT="/tmp/claude-0/-home-user-about/7f9787d4-c743-5828-973b-7494043f4138/scratchpad/eda/img"; os.makedirs(OUT,exist_ok=True)
df=pd.read_csv("/home/user/about/BaiTap_PhanTichTamLyHoc/du_lieu/student_depression_GOC.csv")
SURF="#ffffff";INK="#0b0b0b";SEC="#52514e";MUT="#898781";GRID="#e1e0d9";BASE_="#c3c2b7"
RAMP=["#86b6ef","#5598e7","#2a78d6","#1c5cab","#104281"]
BLUE="#2a78d6";RED="#d03b3b";AQUA="#1baf7a";AMBER="#EDA100"
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':11,'figure.facecolor':SURF,
 'axes.facecolor':SURF,'savefig.facecolor':SURF,'axes.edgecolor':BASE_,'text.color':INK,
 'axes.labelcolor':SEC,'xtick.color':MUT,'ytick.color':MUT})
def vn(x,d=1):
    t=f"{x:,.{d}f}"; return t.replace(",","\x00").replace(".",",").replace("\x00",".")
def st(ax,yg=True,xg=False):
    for s in ['top','right']: ax.spines[s].set_visible(False)
    for s in ['left','bottom']: ax.spines[s].set_color(BASE_); ax.spines[s].set_linewidth(.8)
    if yg: ax.yaxis.grid(True,color=GRID,lw=.8,zorder=0)
    if xg: ax.xaxis.grid(True,color=GRID,lw=.8,zorder=0)
    ax.set_axisbelow(True); ax.tick_params(length=0)
def sv(f,n): f.savefig(f"{OUT}/{n}.png",dpi=190,bbox_inches='tight',pad_inches=0.2); plt.close(f); print("saved",n)

# E1: phan bo 4 bien so chinh
fig,axes=plt.subplots(2,2,figsize=(10.4,6.2))
specs=[('Age','Tuổi','tuổi',25),('CGPA','Điểm CGPA','điểm',30),
       ('Work/Study Hours','Số giờ học/làm mỗi ngày','giờ',13),('Academic Pressure','Áp lực học tập','mức',11)]
for ax,(c,t,u,b) in zip(axes.ravel(),specs):
    ax.hist(df[c].dropna(),bins=b,color=BLUE,edgecolor=SURF,linewidth=.6,zorder=3)
    med=df[c].median(); ax.axvline(med,color=RED,lw=1.8,ls='--',zorder=4)
    lo,hi=ax.get_xlim(); near_right=(med-lo)/(hi-lo) > 0.62
    ax.text(.03 if near_right else .97,.93,f"TV = {vn(med,2 if c=='CGPA' else 0)}",
            transform=ax.transAxes,ha='left' if near_right else 'right',
            fontsize=10.5,fontweight='bold',color=RED)
    st(ax); ax.set_title(t,fontsize=12,fontweight='bold',color=INK,loc='left',pad=8)
    ax.set_xlabel(u,color=SEC,fontsize=10); ax.set_ylabel("Số sinh viên",color=SEC,fontsize=10)
fig.suptitle("Phân bố bốn biến số chính · đường đứt đỏ là trung vị",fontsize=13,fontweight='bold',
             color=INK,x=0.008,ha='left',y=1.005)
fig.tight_layout(); sv(fig,"e1_phanbo")

# E2: hop bieu do phat hien ngoai lai
fig,ax=plt.subplots(figsize=(10.4,3.6))
cols=['Age','CGPA','Work/Study Hours','Academic Pressure','Study Satisfaction','Financial Stress']
lab=['Tuổi','CGPA','Giờ học/làm','Áp lực học tập','Hài lòng việc học','Áp lực tài chính']
bp=ax.boxplot([df[c].dropna() for c in cols],vert=False,tick_labels=lab,patch_artist=True,widths=.55,
   flierprops=dict(marker='o',ms=3.5,mfc=RED,mec='none',alpha=.5),
   medianprops=dict(color=SURF,lw=1.8),whiskerprops=dict(color=BASE_),capprops=dict(color=BASE_))
for p in bp['boxes']: p.set_facecolor(BLUE); p.set_edgecolor('none')
st(ax,yg=False,xg=True); ax.set_xlabel("Giá trị",color=SEC)
ax.set_title("Phát hiện ngoại lai bằng biểu đồ hộp · chấm đỏ là điểm ngoại lai theo quy tắc 1,5×IQR",
             fontsize=12.5,fontweight='bold',color=INK,loc='left',pad=12)
sv(fig,"e2_ngoailai")

# E3: ty le tram cam theo 4 bien phan loai
fig,axes=plt.subplots(1,4,figsize=(13.2,3.8))
cfg=[('Have you ever had suicidal thoughts ?',['No','Yes'],['Không','Có'],'Ý định tự tử'),
     ('Dietary Habits',['Healthy','Moderate','Unhealthy'],['Lành mạnh','Trung bình','Kém'],'Chế độ ăn'),
     ('Sleep Duration',['Less than 5 hours','5-6 hours','7-8 hours','More than 8 hours'],
      ['<5h','5–6h','7–8h','>8h'],'Thời lượng ngủ'),
     ('Family History of Mental Illness',['No','Yes'],['Không','Có'],'Tiền sử gia đình')]
for ax,(c,order,lb,t) in zip(axes,cfg):
    g=(df.groupby(c)['Depression'].mean()*100).reindex(order)
    cols_=[AQUA if v==g.min() else (RED if v==g.max() else BLUE) for v in g]
    b=ax.bar(range(len(g)),g.values,color=cols_,width=.62,zorder=3)
    for i,v in enumerate(g.values): ax.text(i,v+1.6,f"{vn(v)}%",ha='center',fontsize=10.5,fontweight='bold',color=INK)
    st(ax); ax.set_xticks(range(len(g))); ax.set_xticklabels(lb,fontsize=10)
    ax.set_ylim(0,92); ax.set_title(t,fontsize=12,fontweight='bold',color=INK,loc='left',pad=8)
    if ax is axes[0]: ax.set_ylabel("Tỷ lệ trầm cảm (%)",color=SEC)
fig.suptitle("Tỷ lệ trầm cảm theo bốn biến phân loại · xanh = thấp nhất, đỏ = cao nhất",
             fontsize=13,fontweight='bold',color=INK,x=0.006,ha='left',y=1.03)
fig.tight_layout(); sv(fig,"e3_phanloai")

# E4: ma tran tuong quan
X=['Age','Academic Pressure','CGPA','Study Satisfaction','Work/Study Hours','Financial Stress','Depression']
L=['Tuổi','Áp lực học tập','CGPA','Hài lòng việc học','Giờ học/làm','Áp lực tài chính','Trầm cảm']
M=df[X].corr().values
fig,ax=plt.subplots(figsize=(7.6,6.2))
im=ax.imshow(M,cmap='RdBu_r',vmin=-.6,vmax=.6)
for i in range(len(X)):
    for j in range(len(X)):
        ax.text(j,i,vn(M[i,j],2),ha='center',va='center',fontsize=10,fontweight='bold',
                color="#ffffff" if abs(M[i,j])>.38 else INK)
ax.set_xticks(range(len(X))); ax.set_xticklabels(L,rotation=38,ha='right',fontsize=10)
ax.set_yticks(range(len(X))); ax.set_yticklabels(L,fontsize=10)
for s in ax.spines.values(): s.set_visible(False)
ax.tick_params(length=0)
ax.set_title("Ma trận tương quan · các biến độc lập gần như không tương quan với nhau",
             fontsize=12.5,fontweight='bold',color=INK,loc='left',pad=12)
sv(fig,"e4_tuongquan")
print("DONE")
