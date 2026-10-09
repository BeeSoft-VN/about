import os as _os
_HERE=_os.path.dirname(_os.path.abspath(__file__))
_ROOT=_os.path.dirname(_HERE)
import pandas as pd, numpy as np
from scipy import stats
pd.set_option('display.width',240); pd.set_option('display.max_columns',40)
df=pd.read_csv(_os.path.join(_ROOT,"du_lieu","asd_treEm_GOC.csv"))
n0=len(df); log=[]

# B1: bo cot dinh danh
df=df.drop(columns=["CASE_NO_PATIENT'S"]); log.append("Bo cot CASE_NO_PATIENT'S (dinh danh, khong mang thong tin)")

# B2: chuan hoa chu hoa/thuong o bien phan loai
for c in ['Ethnicity','Who_completed_the_test']:
    before=df[c].nunique()
    df[c]=df[c].str.strip().str.title()
    log.append(f"{c}: chuan hoa chu hoa/thuong {before} -> {df[c].nunique()} nhom")

# B3: bo ban ghi trung lap
d=df.duplicated().sum()
df=df.drop_duplicates().reset_index(drop=True)
log.append(f"Bo {d} ban ghi trung lap hoan toan ({d/n0*100:.1f}% du lieu goc)")

# B4: dien khuyet
na=df.isna().sum(); na=na[na>0]
for c in na.index:
    df[c]=df[c].fillna(df[c].median() if pd.api.types.is_numeric_dtype(df[c]) else df[c].mode()[0])
log.append(f"Dien {na.sum()} o khuyet ({dict(na)}) bang trung vi / gia tri pho bien")

# B5: ma hoa
A=[f'A{i}' for i in range(1,10)]+['A10_Autism_Spectrum_Quotient']
df['AQ_total']=df[A].sum(axis=1)
COMO={'Speech Delay/Language Disorder':'ChamNoi','Learning disorder':'KhoHoc',
      'Global developmental delay/intellectual disability':'ChamPTTT',
      'Social/Behavioural Issues':'VanDeHanhVi','Anxiety_disorder':'LoAu',
      'Depression':'TramCam','Genetic_Disorders':'RoiLoanGen'}
for k,v in COMO.items(): df[v]=(df[k]=='Yes').astype(int)
df['ASD']=(df['ASD_traits']=='Yes').astype(int)
df['Nam']=(df['Sex']=='M').astype(int)
df['TienSuGD']=(df['Family_mem_with_ASD']=='Yes').astype(int)
df['VangDa']=(df['Jaundice']=='Yes').astype(int)
EDU=['ChamNoi','KhoHoc','ChamPTTT','VanDeHanhVi','LoAu']
df['So_RL_GiaoDuc']=df[EDU].sum(axis=1)
log.append("Ma hoa Yes/No -> 1/0; tao AQ_total (0-10) va So_RL_GiaoDuc (0-5)")

print("=== NHAT KY TIEN XU LY ==="); [print(f"  {i+1}. {l}") for i,l in enumerate(log)]
print(f"\nKich thuoc: {n0} x 28  ->  {df.shape[0]} x {df.shape[1]}")
df.to_csv(_os.path.join(_ROOT,"du_lieu","asd_treEm_CLEANED.csv"),index=False)

# ===================== PHAN TICH =====================
n=len(df); asd=df[df.ASD==1]; non=df[df.ASD==0]
print(f"\n\n=== 1. CO CAU MAU ===")
print(f"Tong: {n} tre | Co dau hieu ASD: {len(asd)} ({len(asd)/n*100:.1f}%) | Khong: {len(non)} ({len(non)/n*100:.1f}%)")
print(f"Tuoi: TB {df.Age_Years.mean():.1f} | trung vi {df.Age_Years.median():.0f} | khoang {df.Age_Years.min()}-{df.Age_Years.max()}")
print(f"Gioi tinh: Nam {(df.Sex=='M').sum()} / Nu {(df.Sex=='F').sum()} = {(df.Sex=='M').sum()/(df.Sex=='F').sum():.2f}:1")

print("\n=== 2. TY LE ROI LOAN DI KEM (nhom co dau hieu ASD vs khong) ===")
rows=[]
for k,v in COMO.items():
    pa,pn=asd[v].mean()*100, non[v].mean()*100
    ct=pd.crosstab(df[v],df['ASD']); chi2,p,_,_=stats.chi2_contingency(ct)
    rows.append((k,round(pa,1),round(pn,1),round(pa-pn,1),f"{p:.3f}"))
t=pd.DataFrame(rows,columns=['Roi loan di kem','ASD %','Khong ASD %','Chenh','p-value'])
print(t.sort_values('Chenh',ascending=False).to_string(index=False))

print("\n=== 3. SO ROI LOAN GIAO DUC DONG THOI (0-5) ===")
g=df.groupby('So_RL_GiaoDuc').agg(n=('ASD','size'), ty_le_ASD=('ASD','mean'))
g['ty_le_ASD']=(g['ty_le_ASD']*100).round(1); g['%mau']=(g['n']/n*100).round(1)
print(g)
print(f"\nTre co >=3 roi loan dong thoi: {(df.So_RL_GiaoDuc>=3).sum()} ({(df.So_RL_GiaoDuc>=3).mean()*100:.1f}%)")
print(f"Trung binh so roi loan/tre: {df.So_RL_GiaoDuc.mean():.2f}")
print(f"Trong nhom ASD: {asd.So_RL_GiaoDuc.mean():.2f} | ngoai: {non.So_RL_GiaoDuc.mean():.2f}")

print("\n=== 4. THANG DO vs ASD ===")
for c in ['AQ_total','Social_Responsiveness_Scale','Qchat_10_Score','Childhood Autism Rating Scale','Age_Years']:
    r,p=stats.pointbiserialr(df['ASD'],df[c])
    print(f"  {c:34s} r={r:+.3f}  p={p:.2e}  | ASD {asd[c].mean():.2f} vs khong {non[c].mean():.2f}")

print("\n=== 5. TUOI SANG LOC ===")
df['NhomTuoi']=pd.cut(df.Age_Years,[0,3,6,11,15,18],labels=['1-3 (mam non)','4-6 (mau giao)','7-11 (tieu hoc)','12-15 (THCS)','16-18 (THPT)'])
a=df.groupby('NhomTuoi',observed=True).agg(n=('ASD','size'),ASD=('ASD','mean'),RL=('So_RL_GiaoDuc','mean'))
a['ASD']=(a['ASD']*100).round(1); a['RL']=a['RL'].round(2); a['%mau']=(a['n']/n*100).round(1)
print(a)

print("\n=== 6. AI LA NGUOI SANG LOC ===")
w=df.groupby('Who_completed_the_test').agg(n=('ASD','size'),ASD=('ASD','mean'),tuoi=('Age_Years','mean'))
w['ASD']=(w['ASD']*100).round(1); w['tuoi']=w['tuoi'].round(1)
print(w.sort_values('n',ascending=False))

print("\n=== 7. CARS (muc do nang) ===")
c=df.groupby('Childhood Autism Rating Scale').agg(n=('ASD','size'),ASD=('ASD','mean'),RL=('So_RL_GiaoDuc','mean'))
c['ASD']=(c['ASD']*100).round(1); c['RL']=c['RL'].round(2); print(c)

print("\n=== 8. CAC MUC AQ (A1-A10) phan biet manh nhat ===")
rows=[]
for i,col in enumerate(A,1):
    pa,pn=asd[col].mean()*100, non[col].mean()*100
    rows.append((col,round(pa,1),round(pn,1),round(pa-pn,1)))
print(pd.DataFrame(rows,columns=['Muc','ASD %','Khong %','Chenh']).sort_values('Chenh',ascending=False).to_string(index=False))
