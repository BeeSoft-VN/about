import os as _os
_HERE = _os.path.dirname(_os.path.abspath(__file__))
_ROOT = _os.path.dirname(_HERE)          # thu muc BaiTap_PhanTichTamLyHoc
import pandas as pd, numpy as np
from scipy import stats
pd.set_option('display.width',220); pd.set_option('display.max_columns',60)
df = pd.read_csv(_os.path.join(_ROOT,"du_lieu","student_depression_GOC.csv"))
n0=len(df); log=[]

# --- 1. Drop near-constant / leakage-free irrelevant columns
drop_cols=['id','Profession','Work Pressure','Job Satisfaction']
df=df.drop(columns=drop_cols); log.append(f"Bo {len(drop_cols)} cot: {drop_cols}")

# --- 2. Fix invalid City (names/degrees/numbers leaked into City)
valid_city_mask = df['City'].map(df['City'].value_counts()) >= 10
bad_city = (~valid_city_mask).sum()
df.loc[~valid_city_mask,'City']=np.nan
log.append(f"City: {bad_city} gia tri rac -> NaN ({df['City'].nunique()} thanh pho hop le)")

# --- 3. Likert 0 -> NaN (scale is 1..5)
for c in ['Academic Pressure','Study Satisfaction']:
    z=(df[c]==0).sum(); df.loc[df[c]==0,c]=np.nan; log.append(f"{c}: {z} gia tri 0 ngoai thang do 1-5 -> NaN")
z=(df['CGPA']==0).sum(); df.loc[df['CGPA']==0,'CGPA']=np.nan; log.append(f"CGPA: {z} gia tri 0 khong hop le -> NaN")

# --- 4. 'Others' junk categories
for c in ['Sleep Duration','Dietary Habits','Degree']:
    z=(df[c]=='Others').sum(); df.loc[df[c]=='Others',c]=np.nan; log.append(f"{c}: {z} nhan 'Others' -> NaN")

# --- 5. Impute: numeric=median, categorical=mode
na_before=df.isna().sum().sum()
for c in df.columns:
    if df[c].isna().any():
        df[c]=df[c].fillna(df[c].median() if pd.api.types.is_numeric_dtype(df[c]) else df[c].mode()[0])
log.append(f"Dien khuyet {na_before} o (so: median / chu: mode)")

# --- 6. Encode ordinal
sleep_map={'Less than 5 hours':4.5,'5-6 hours':5.5,'7-8 hours':7.5,'More than 8 hours':9.0}
df['Sleep_Hours']=df['Sleep Duration'].map(sleep_map)
diet_map={'Healthy':1,'Moderate':2,'Unhealthy':3}
df['Diet_Score']=df['Dietary Habits'].map(diet_map)
df['Suicidal']= (df['Have you ever had suicidal thoughts ?']=='Yes').astype(int)
df['FamHistory']=(df['Family History of Mental Illness']=='Yes').astype(int)
df['Gender_M']=(df['Gender']=='Male').astype(int)
log.append("Ma hoa: Sleep->gio, Diet->1-3, Yes/No->1/0")

print("=== NHAT KY TIEN XU LY ==="); [print(f"  {i+1}. {l}") for i,l in enumerate(log)]
print(f"\nKich thuoc: {n0} x 18  ->  {df.shape[0]} x {df.shape[1]}  (giu 100% ban ghi)")
df.to_csv(_os.path.join(_ROOT,"du_lieu","student_depression_CLEANED.csv"), index=False)

# ===================== PHAN TICH =====================
print("\n\n=== 1. TY LE TRAM CAM THEO TUNG YEU TO ===")
def rate(by):
    g=df.groupby(by)['Depression'].agg(['mean','count'])
    g['mean']=(g['mean']*100).round(1); return g.rename(columns={'mean':'TyLe%','count':'N'})
for col in ['Have you ever had suicidal thoughts ?','Academic Pressure','Financial Stress',
            'Sleep Duration','Dietary Habits','Study Satisfaction','Family History of Mental Illness','Gender']:
    print(f"\n--- {col} ---"); print(rate(col))

print("\n\n=== 2. TUONG QUAN POINT-BISERIAL VOI DEPRESSION ===")
num=['Academic Pressure','Financial Stress','Study Satisfaction','Sleep_Hours','Diet_Score',
     'Work/Study Hours','CGPA','Age','Suicidal','FamHistory','Gender_M']
rows=[]
for c in num:
    r,p=stats.pointbiserialr(df['Depression'],df[c]); rows.append((c,round(r,3),f"{p:.2e}"))
cor=pd.DataFrame(rows,columns=['Bien','r','p-value']).sort_values('r',key=abs,ascending=False)
print(cor.to_string(index=False))

print("\n\n=== 3. KIEM DINH CHI-SQUARE ===")
for c in ['Have you ever had suicidal thoughts ?','Dietary Habits','Sleep Duration','Family History of Mental Illness','Gender']:
    ct=pd.crosstab(df[c],df['Depression']); chi2,p,dof,_=stats.chi2_contingency(ct)
    v=np.sqrt(chi2/(len(df)*(min(ct.shape)-1)))
    print(f"{c:42s} chi2={chi2:9.1f}  p={p:.3e}  Cramer's V={v:.3f}")

print("\n\n=== 4. TUOI ===")
df['AgeGroup']=pd.cut(df['Age'],[17,20,23,26,30,60],labels=['18-20','21-23','24-26','27-30','31+'])
print(rate('AgeGroup'))
print("\n=== 5. TUONG TAC: Ap luc hoc tap x Y dinh tu tu ===")
print((pd.crosstab(df['Academic Pressure'],df['Suicidal'],df['Depression'],aggfunc='mean')*100).round(1))
print("\n=== 6. GIO HOC/LAM ===")
df['WSH_bin']=pd.cut(df['Work/Study Hours'],[-1,3,6,9,12],labels=['0-3h','4-6h','7-9h','10-12h'])
print(rate('WSH_bin'))
print("\n=== 7. CGPA ===")
df['CGPA_bin']=pd.qcut(df['CGPA'],4)
print(rate('CGPA_bin'))
