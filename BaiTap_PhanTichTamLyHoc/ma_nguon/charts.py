import os as _os
_HERE = _os.path.dirname(_os.path.abspath(__file__))
_ROOT = _os.path.dirname(_HERE)          # thu muc BaiTap_PhanTichTamLyHoc
import matplotlib; matplotlib.use('Agg')
import matplotlib.pyplot as plt, pandas as pd, numpy as np
from matplotlib.patches import FancyBboxPatch
OUT=_os.path.join(_ROOT,"bieu_do"); _os.makedirs(OUT,exist_ok=True)
df=pd.read_csv(_os.path.join(_ROOT,"du_lieu","student_depression_CLEANED.csv"))

SURF="#ffffff"; INK="#0b0b0b"; SEC="#52514e"; MUT="#898781"; GRID="#e1e0d9"; BASE_="#c3c2b7"
RAMP=["#86b6ef","#5598e7","#2a78d6","#1c5cab","#104281"]
BLUE="#2a78d6"; RED="#d03b3b"; AQUA="#1baf7a"; ORANGE="#eb6834"
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':12,'figure.facecolor':SURF,
    'axes.facecolor':SURF,'savefig.facecolor':SURF,'axes.edgecolor':BASE_,'text.color':INK,
    'axes.labelcolor':SEC,'xtick.color':MUT,'ytick.color':MUT})


def vn(x, d=1):
    """So kieu Viet Nam: dau phay thap phan, dau cham phan nghin."""
    t = f"{x:,.{d}f}"
    return t.replace(",", "\u00a0").replace(".", ",").replace("\u00a0", ".")
def vni(x):
    return f"{int(x):,}".replace(",", ".")

def style(ax, ygrid=True, xgrid=False):
    for s in ['top','right']: ax.spines[s].set_visible(False)
    ax.spines['left'].set_color(BASE_); ax.spines['bottom'].set_color(BASE_)
    ax.spines['left'].set_linewidth(0.8); ax.spines['bottom'].set_linewidth(0.8)
    if ygrid: ax.yaxis.grid(True,color=GRID,lw=0.8,zorder=0); ax.set_axisbelow(True)
    if xgrid: ax.xaxis.grid(True,color=GRID,lw=0.8,zorder=0); ax.set_axisbelow(True)
    ax.tick_params(length=0)

def save(fig,name):
    fig.savefig(f"{OUT}/{name}.png",dpi=200,bbox_inches='tight',pad_inches=0.25); plt.close(fig)
    print("saved",name)

def rate(by):
    g=df.groupby(by,observed=True)['Depression'].agg(['mean','count']); g['mean']*=100; return g

# ---------- C1: Phan bo bien muc tieu + mat can bang ----------
fig,ax=plt.subplots(figsize=(7.2,4.2))
v=df['Depression'].value_counts().sort_index(); pct=v/v.sum()*100
b=ax.bar(['Không trầm cảm','Có dấu hiệu trầm cảm'],v.values,color=[AQUA,RED],width=.52,zorder=3)
for r,c,p in zip(b,v.values,pct.values):
    ax.text(r.get_x()+r.get_width()/2,c+280,f"{vni(c)}\n{vn(p)}%",ha='center',va='bottom',
            fontsize=13,fontweight='bold',color=INK)
style(ax); ax.set_ylim(0,19500); ax.set_ylabel("Số sinh viên",color=SEC)
ax.set_title("Phân bố biến mục tiêu: 58,5% mẫu có dấu hiệu trầm cảm",fontsize=13.5,fontweight='bold',color=INK,pad=14,loc='left')
ax.text(0,-0.17,"N = 27.901 sinh viên · Mất cân bằng nhẹ (1,41:1) → không cần lấy mẫu lại",
        transform=ax.transAxes,fontsize=10,color=MUT)
save(fig,"c1_target")

# ---------- C2: Ap luc hoc tap & Ap luc tai chinh ----------
fig,axes=plt.subplots(1,2,figsize=(12.4,4.4))
for ax,col,title in zip(axes,['Academic Pressure','Financial Stress'],
                        ['Áp lực học tập','Áp lực tài chính']):
    g=rate(col)
    b=ax.bar(g.index.astype(int).astype(str),g['mean'],color=RAMP,width=.62,zorder=3)
    for r,val in zip(b,g['mean']):
        ax.text(r.get_x()+r.get_width()/2,val+2,f"{vn(val)}%",ha='center',fontsize=11.5,fontweight='bold',color=INK)
    style(ax); ax.set_ylim(0,100); ax.set_xlabel(f"{title} (thang đo 1–5)",color=SEC)
    ax.set_ylabel("Tỷ lệ trầm cảm (%)",color=SEC)
    d=g['mean'].iloc[-1]-g['mean'].iloc[0]
    ax.set_title(f"{title}: 1 → 5 làm tỷ lệ tăng {d:.0f} điểm %",fontsize=12.5,fontweight='bold',color=INK,pad=12,loc='left')
fig.tight_layout(); save(fig,"c2_pressure")

# ---------- C3: Tuong quan xep hang (diverging) ----------
from scipy import stats
F={'Ý định tự tử':'Suicidal','Áp lực học tập':'Academic Pressure','Áp lực tài chính':'Financial Stress',
   'Tuổi':'Age','Giờ học/làm mỗi ngày':'Work/Study Hours','Chế độ ăn kém lành mạnh':'Diet_Score',
   'Hài lòng việc học':'Study Satisfaction','Số giờ ngủ':'Sleep_Hours',
   'Tiền sử gia đình':'FamHistory','Điểm CGPA':'CGPA','Giới tính (nam)':'Gender_M'}
rows=[(k,stats.pointbiserialr(df['Depression'],df[v])[0],stats.pointbiserialr(df['Depression'],df[v])[1]) for k,v in F.items()]
c=pd.DataFrame(rows,columns=['n','r','p']).sort_values('r')
fig,ax=plt.subplots(figsize=(9.6,5.6))
cols=[RED if x>0 else BLUE for x in c['r']]
ax.barh(c['n'],c['r'],color=cols,height=.6,zorder=3)
for i,(x,p) in enumerate(zip(c['r'],c['p'])):
    sig="" if p<0.001 else ("  (p=%s, không có ý nghĩa)"%vn(p,2) if p>=.05 else "")
    ax.text(x+(0.016 if x>0 else -0.016),i,f"{'+' if x>0 else '\u2212'}{vn(abs(x),3)}{sig}",va='center',
            ha='left' if x>0 else 'right',fontsize=11,fontweight='bold',color=INK)
ax.axvline(0,color=BASE_,lw=1.2,zorder=4)
style(ax,ygrid=False,xgrid=True); ax.set_xlim(-0.45,0.86)
from matplotlib.ticker import FuncFormatter
ax.xaxis.set_major_formatter(FuncFormatter(lambda t,_: vn(t,1).replace('-','\u2212')))
ax.set_xlabel("Hệ số tương quan point-biserial với tình trạng trầm cảm",color=SEC)
ax.set_title("Yếu tố nào liên quan mạnh nhất đến trầm cảm?",fontsize=13.5,fontweight='bold',color=INK,pad=12,loc='left')
ax.text(0,-0.14,"Đỏ = làm TĂNG nguy cơ · Xanh = làm GIẢM nguy cơ · Tất cả p<0,001 trừ giới tính",
        transform=ax.transAxes,fontsize=10,color=MUT)
save(fig,"c3_corr")

# ---------- C4: Loi song (ngu + an uong) ----------
fig,axes=plt.subplots(1,2,figsize=(12.4,4.4))
so=['Less than 5 hours','5-6 hours','7-8 hours','More than 8 hours']
lab=['Dưới 5 giờ','5–6 giờ','7–8 giờ','Trên 8 giờ']
g=rate('Sleep Duration').reindex(so)
b=axes[0].bar(lab,g['mean'],color=[RED,BLUE,BLUE,AQUA],width=.6,zorder=3)
for r,v in zip(b,g['mean']): axes[0].text(r.get_x()+r.get_width()/2,v+1.5,f"{vn(v)}%",ha='center',fontsize=11.5,fontweight='bold',color=INK)
axes[0].set_xlabel("Thời lượng ngủ mỗi đêm",color=SEC)
axes[0].set_title("Thời lượng ngủ: quan hệ KHÔNG tuyến tính (r = −0,082)",fontsize=12,fontweight='bold',color=INK,pad=12,loc='left')
do=['Healthy','Moderate','Unhealthy']; dl=['Lành mạnh','Trung bình','Kém lành mạnh']
g2=rate('Dietary Habits').reindex(do)
b=axes[1].bar(dl,g2['mean'],color=[AQUA,ORANGE,RED],width=.6,zorder=3)
for r,v in zip(b,g2['mean']): axes[1].text(r.get_x()+r.get_width()/2,v+1.5,f"{vn(v)}%",ha='center',fontsize=11.5,fontweight='bold',color=INK)
axes[1].set_xlabel("Chế độ ăn uống",color=SEC)
axes[1].set_title("Chế độ ăn: tăng đều 25,3 điểm % (r = +0,207)",fontsize=12,fontweight='bold',color=INK,pad=12,loc='left')
for ax in axes: style(ax); ax.set_ylim(0,80); ax.set_ylabel("Tỷ lệ trầm cảm (%)",color=SEC)
fig.tight_layout(); save(fig,"c4_lifestyle")

# ---------- C5: Tuoi + gio hoc ----------
fig,axes=plt.subplots(1,2,figsize=(12.4,4.4))
df['AgeGroup']=pd.cut(df['Age'],[17,20,23,26,30,60],labels=['18-20','21-23','24-26','27-30','31+'])
g=rate('AgeGroup')
axes[0].plot(range(len(g)),g['mean'],color=BLUE,lw=2.4,marker='o',ms=9,zorder=3,
             markerfacecolor=BLUE,markeredgecolor=SURF,markeredgewidth=2)
for i,v in enumerate(g['mean']): axes[0].text(i,v+3.2,f"{vn(v)}%",ha='center',fontsize=11.5,fontweight='bold',color=INK)
axes[0].set_xticks(range(len(g))); axes[0].set_xticklabels(g.index)
axes[0].set_ylim(32,86); axes[0].set_xlim(-0.35,4.35); axes[0].set_xlabel("Nhóm tuổi",color=SEC)
axes[0].set_title("Tuổi càng trẻ, nguy cơ càng cao (r = −0,226)",fontsize=12,fontweight='bold',color=INK,pad=12,loc='left')
df['WSH']=pd.cut(df['Work/Study Hours'],[-1,3,6,9,12],labels=['0–3 giờ','4–6 giờ','7–9 giờ','10–12 giờ'])
g2=rate('WSH')
b=axes[1].bar(g2.index.astype(str),g2['mean'],color=RAMP[:4],width=.6,zorder=3)
for r,v in zip(b,g2['mean']): axes[1].text(r.get_x()+r.get_width()/2,v+1.5,f"{vn(v)}%",ha='center',fontsize=11.5,fontweight='bold',color=INK)
axes[1].set_ylim(0,82); axes[1].set_xlabel("Số giờ học/làm mỗi ngày",color=SEC)
axes[1].set_title("Học 10–12 giờ/ngày: 69,0% có dấu hiệu trầm cảm",fontsize=12,fontweight='bold',color=INK,pad=12,loc='left')
for ax in axes: style(ax); ax.set_ylabel("Tỷ lệ trầm cảm (%)",color=SEC)
fig.tight_layout(); save(fig,"c5_age_hours")

# ---------- C6: Dose-response (bieu do chu dao) ----------
df['nRisk']=((df['Academic Pressure']>=4).astype(int)+(df['Financial Stress']>=4).astype(int)
            +(df['Sleep_Hours']<5).astype(int)+(df['Diet_Score']==3).astype(int)+df['Suicidal'])
g=rate('nRisk')
fig,ax=plt.subplots(figsize=(10.4,5.2))
ramp6=["#86b6ef","#5598e7","#2a78d6","#1c5cab","#104281","#d03b3b"]
b=ax.bar(range(len(g)),g['mean'],color=ramp6,width=.62,zorder=3)
for r,v in zip(b,g['mean']):
    ax.text(r.get_x()+r.get_width()/2,v+2.5,f"{vn(v)}%",ha='center',fontsize=13.5,fontweight='bold',color=INK)
ax.set_xticks(range(len(g)))
ax.set_xticklabels([f"{i}\nn={vni(n)}" for i,n in zip(g.index,g['count'])],fontsize=11.5)
style(ax); ax.set_ylim(0,124)
ax.set_xlabel("\nSố yếu tố nguy cơ đồng thời (áp lực học · áp lực tài chính · thiếu ngủ · ăn uống kém · ý định tự tử)",color=SEC,fontsize=10.5)
ax.set_ylabel("Tỷ lệ trầm cảm (%)",color=SEC)
ax.set_title("Hiệu ứng cộng dồn: từ 4,5% lên 98,6% — nguy cơ tăng theo liều",fontsize=14,fontweight='bold',color=INK,pad=14,loc='left')
ax.annotate("",xy=(5,116),xytext=(0,116),arrowprops=dict(arrowstyle='->',color=MUT,lw=1.4))
ax.text(2.5,118,"nguy cơ gấp 21,7 lần",ha='center',fontsize=11.5,color=SEC,fontweight='bold')
save(fig,"c6_dose")

# ---------- C7: Do quan trong bien (mo hinh) ----------
imp=pd.read_csv(_os.path.join(_HERE,"importance.csv"))
m={'Suicidal':'Ý định tự tử','Academic Pressure':'Áp lực học tập','Financial Stress':'Áp lực tài chính',
   'Age':'Tuổi','Work/Study Hours':'Giờ học/làm','CGPA':'Điểm CGPA','Diet_Score':'Chế độ ăn',
   'Study Satisfaction':'Hài lòng việc học','Sleep_Hours':'Số giờ ngủ','FamHistory':'Tiền sử gia đình','Gender_M':'Giới tính'}
imp['n']=imp['Bien'].map(m); imp=imp.sort_values('Importance')
fig,ax=plt.subplots(figsize=(9.2,5.2))
cols=[BLUE]*len(imp); cols[-1]=RED; cols[-2]=RED
ax.barh(imp['n'],imp['Importance']*100,color=cols,height=.62,zorder=3)
for i,v in enumerate(imp['Importance']*100):
    ax.text(v+0.5,i,f"{vn(v)}%",va='center',fontsize=11,fontweight='bold',color=INK)
style(ax,ygrid=False,xgrid=True); ax.set_xlim(0,40)
ax.set_xlabel("Độ quan trọng trong mô hình Random Forest (%)",color=SEC)
ax.set_title("Hai biến đầu giải thích 56% sức mạnh dự báo",fontsize=13.5,fontweight='bold',color=INK,pad=12,loc='left')
save(fig,"c7_importance")

# ---------- C8: Tuong tac ap luc x y dinh tu tu (heatmap) ----------
ct=pd.crosstab(df['Academic Pressure'],df['Suicidal'],df['Depression'],aggfunc='mean')*100
fig,ax=plt.subplots(figsize=(7.6,5.0))
im=ax.imshow(ct.values,cmap='Blues',aspect='auto',vmin=0,vmax=100)
for i in range(ct.shape[0]):
    for j in range(ct.shape[1]):
        v=ct.values[i,j]
        ax.text(j,i,f"{vn(v)}%",ha='center',va='center',fontsize=14,fontweight='bold',
                color="#ffffff" if v>55 else INK)
ax.set_xticks([0,1]); ax.set_xticklabels(['Không có ý định tự tử','Từng có ý định tự tử'],fontsize=11)
ax.set_yticks(range(5)); ax.set_yticklabels([f"Mức {int(i)}" for i in ct.index],fontsize=11)
ax.set_ylabel("Áp lực học tập",color=SEC); ax.tick_params(length=0)
for s in ax.spines.values(): s.set_visible(False)
ax.set_title("Tương tác: hai yếu tố cộng hưởng, không chỉ cộng dồn",fontsize=13,fontweight='bold',color=INK,pad=14,loc='left')
save(fig,"c8_heat")
print("\nDONE")
