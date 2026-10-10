import pandas as pd, numpy as np
from scipy import stats
pd.set_option('display.width',200)
R="/home/user/about"
SD = pd.read_csv(f"{R}/BaiTap_PhanTichTamLyHoc/du_lieu/student_depression_GOC.csv")
SC = pd.read_csv(f"{R}/BaiTap_PhanTichTamLyHoc/du_lieu/student_depression_CLEANED.csv")
AG = pd.read_csv(f"{R}/PhanTich_TuKy_TreEm/du_lieu/asd_treEm_GOC.csv")
AC = pd.read_csv(f"{R}/PhanTich_TuKy_TreEm/du_lieu/asd_treEm_CLEANED.csv")
vn=lambda x,d=1: f"{x:.{d}f}".replace('.',',')

print("="*60); print("B1  Mo ta bo du lieu")
print(f"  SD goc: {SD.shape[0]} dong x {SD.shape[1]} cot | so bien: {SD.shape[1]}")
print(f"  Kieu: so={SD.select_dtypes('number').shape[1]}, chu={SD.shape[1]-SD.select_dtypes('number').shape[1]}")

print("\nB2  Khuyet & trung lap")
m=SD.isna().sum(); m=m[m>0]
print(f"  SD: o khuyet={SD.isna().sum().sum()} tai {dict(m)} | trung (bo id)={SD.drop(columns=['id']).duplicated().sum()}")
CASE="CASE_NO_PATIENT'S"
print(f"  ASD goc: o khuyet={AG.isna().sum().sum()} | trung (bo CASE_NO)={AG.drop(columns=[CASE]).duplicated().sum()}")

print("\nB3  Ty le bien muc tieu")
v=SD['Depression'].value_counts()
print(f"  SD: 1={v[1]} ({vn(v[1]/len(SD)*100)}%) | 0={v[0]} ({vn(v[0]/len(SD)*100)}%) | ty so {vn(v[1]/v[0],2)}:1")

print("\nB4+B8  Ty le tram cam theo Ap luc hoc tap (goc)")
g=SD.groupby('Academic Pressure')['Depression'].agg(['mean','count'])
for k,r in g.iterrows(): print(f"    muc {k:.0f}: {vn(r['mean']*100)}%  (n={int(r['count'])})")

print("\nB5  Kiem chung con so")
print(f"  16336/27901*100 = {16336/27901*100:.10f}  -> 1 chu so TP: {vn(16336/27901*100)}")

print("\nB6  Gia tri lac cho cot City")
vc=SD['City'].value_counts(); rare=vc[vc<10]
print(f"  so thanh pho >=10 ban ghi: {(vc>=10).sum()} | so gia tri rac: {rare.sum()} ({len(rare)} nhan)")
print(f"  danh sach: {sorted(rare.index.tolist())}")

print("\nB7  Tien xu ly SD")
print(f"  cot gan hang so: Profession {vn((SD['Profession']=='Student').mean()*100,1)}% | "
      f"Work Pressure=0 {vn((SD['Work Pressure']==0).mean()*100,2)}% | Job Satisfaction=0 {vn((SD['Job Satisfaction']==0).mean()*100,2)}%")
print(f"  gia tri 0 ngoai thang: AP={int((SD['Academic Pressure']==0).sum())} SS={int((SD['Study Satisfaction']==0).sum())} CGPA={int((SD['CGPA']==0).sum())}")
print(f"  nhan 'Others': Sleep={int((SD['Sleep Duration']=='Others').sum())} Diet={int((SD['Dietary Habits']=='Others').sum())} Degree={int((SD['Degree']=='Others').sum())}")
print(f"  => tong o can sua: {26+9+10+9+18+12+35+3}")

print("\nB8  Chi-square che do an x tram cam (du lieu da lam sach)")
ct=pd.crosstab(SC['Dietary Habits'],SC['Depression']); chi2,p,dof,_=stats.chi2_contingency(ct)
V=np.sqrt(chi2/(len(SC)*(min(ct.shape)-1)))
print(f"  chi2={chi2:.1f} dof={dof} p={p:.3e} CramerV={V:.3f}")
for k,r in SC.groupby('Dietary Habits')['Depression'].agg(['mean','count']).iterrows():
    print(f"    {k:10s}: {vn(r['mean']*100)}%  (n={int(r['count'])})")

print("\nB10  Xep hang tuong quan (SD da lam sach)")
F={'Y dinh tu tu':'Suicidal','Ap luc hoc tap':'Academic Pressure','Ap luc tai chinh':'Financial Stress',
   'Tuoi':'Age','Gio hoc/lam':'Work/Study Hours','Che do an':'Diet_Score','Hai long viec hoc':'Study Satisfaction',
   'So gio ngu':'Sleep_Hours','Tien su gia dinh':'FamHistory','Diem CGPA':'CGPA','Gioi tinh nam':'Gender_M'}
for k,c in F.items():
    r,p=stats.pointbiserialr(SC['Depression'],SC[c])
    print(f"    {k:20s} r={r:+.3f}  p={'<0,001' if p<0.001 else vn(p,3)}")

print("\nB11  Bien nhan ban (ASD)")
C=['ChamNoi','KhoHoc','ChamPTTT','VanDeHanhVi','LoAu','TramCam','RoiLoanGen']
M=AC[C].corr().values; iu=np.triu_indices(len(C),1)
print(f"  tuong quan cap: min={M[iu].min():.3f} max={M[iu].max():.3f}")
ag=[( (AC[C[i]]==AC[C[j]]).mean()*100 ) for i in range(len(C)) for j in range(i+1,len(C))]
print(f"  trung khop cap: min={vn(min(ag))}% max={vn(max(ag))}%")
t=AC[C].sum(axis=1)
print(f"  co ca 7: {int((t==7).sum())} ({vn((t==7).mean()*100)}%) | khong co cai nao: {int((t==0).sum())} ({vn((t==0).mean()*100)}%) | tong 2 cuc {vn(((t==7)|(t==0)).mean()*100)}%")

print("\nB12  Ro ri nhan (ASD)")
ct=pd.crosstab(AC['AQ_total'],AC['ASD'])
print(f"  tre KHONG ASD co AQ>=4: {int(((AC.ASD==0)&(AC.AQ_total>=4)).sum())}")
print(f"  tre CO ASD co AQ<=3  : {int(((AC.ASD==1)&(AC.AQ_total<=3)).sum())}")
print(f"  nguong cung: AQ>=4 -> ASD=1, khong ngoai le")

print("\nB13  Tuong tac Ap luc x Y dinh tu tu (SD)")
ct=pd.crosstab(SC['Academic Pressure'],SC['Suicidal'],SC['Depression'],aggfunc='mean')*100
print((ct.round(1)).to_string())
print(f"  o thap nhat {vn(ct.iloc[0,0])}% -> o cao nhat {vn(ct.iloc[-1,1])}% = gap {vn(ct.iloc[-1,1]/ct.iloc[0,0])} lan")

print("\nB14  Chi so tong hop (SD)")
SC2=SC.copy()
SC2['nRisk']=((SC2['Academic Pressure']>=4).astype(int)+(SC2['Financial Stress']>=4).astype(int)
            +(SC2['Sleep_Hours']<5).astype(int)+(SC2['Diet_Score']==3).astype(int)+SC2['Suicidal'])
g=SC2.groupby('nRisk')['Depression'].agg(['mean','count'])
for k,r in g.iterrows(): print(f"    {k} yeu to: {vn(r['mean']*100)}%  (n={int(r['count'])})")
print(f"  ty so cao nhat/thap nhat = {vn(g['mean'].iloc[-1]/g['mean'].iloc[0])} lan")

print("\nB15  On dinh: chia theo gioi tinh")
for s in ['Male','Female']:
    sub=SC[SC.Gender==s]
    r,_=stats.pointbiserialr(sub['Depression'],sub['Academic Pressure'])
    print(f"    {s:7s}: n={len(sub)} r(ap luc hoc tap)={r:+.3f}")
print("\nB15b  On dinh: chia theo nhom tuoi")
SC2['AG']=pd.cut(SC2['Age'],[17,23,30,60],labels=['18-23','24-30','31+'])
for k,sub in SC2.groupby('AG',observed=True):
    r,_=stats.pointbiserialr(sub['Depression'],sub['Academic Pressure'])
    print(f"    {k}: n={len(sub)} r={r:+.3f}")

print("\nB-ASD  Tuoi sang loc & kenh")
print(f"  <=3 tuoi: {int((AC.Age_Years<=3).sum())} ({vn((AC.Age_Years<=3).mean()*100)}%) | trung vi tuoi: {AC.Age_Years.median():.0f}")
w=AC.Who_completed_the_test.value_counts()
print(f"  truong hoc/NGO: {int(w.get('School And Ngo',0))} ({vn(w.get('School And Ngo',0)/len(AC)*100,1)}%)")
asd=AC[AC.ASD==1]
print(f"  tuoi trung vi phat hien: nam={asd[asd.Sex=='M'].Age_Years.median():.0f} nu={asd[asd.Sex=='F'].Age_Years.median():.0f}")
print(f"  ty so nam:nu = {vn((AC.Sex=='M').sum()/(AC.Sex=='F').sum(),2)}:1")
