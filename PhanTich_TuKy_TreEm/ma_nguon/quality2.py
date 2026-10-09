import os as _os
_HERE=_os.path.dirname(_os.path.abspath(__file__))
_ROOT=_os.path.dirname(_HERE)
import pandas as pd, numpy as np
pd.set_option('display.width',240); pd.set_option('display.max_rows',120)
F=_os.path.join(_ROOT,"du_lieu","asd_treEm_GOC.csv")
df=pd.read_csv(F)
print("SHAPE:",df.shape)
print("\n=== TRUNG LAP ===")
print("toan dong:",df.duplicated().sum()," | bo CASE_NO:",df.drop(columns=["CASE_NO_PATIENT'S"]).duplicated().sum())
print("\n=== TUOI ===");print(df['Age_Years'].describe()); print(sorted(df['Age_Years'].unique()))
print("\n=== THANG DO ===")
for c in ['Social_Responsiveness_Scale','Qchat_10_Score','Childhood Autism Rating Scale']:
    print(f"{c}: min={df[c].min()} max={df[c].max()} vals={sorted(df[c].dropna().unique())[:14]}")
print("\n=== A1..A10 tong ===")
A=[f'A{i}' for i in range(1,10)]+['A10_Autism_Spectrum_Quotient']
df['AQ_total']=df[A].sum(axis=1); print(df['AQ_total'].value_counts().sort_index().to_dict())
print("\n=== CAC BIEN PHAN LOAI ===")
for c in df.select_dtypes(include='object').columns:
    print(f"\n-- {c} ({df[c].nunique()} gia tri) --"); print(df[c].value_counts(dropna=False).to_dict())
print("\n=== KHUYET ===")
m=df.isna().sum(); print(m[m>0])
print("\n=== TY LE ASD_traits ===")
print(df['ASD_traits'].value_counts(normalize=True).mul(100).round(2).to_dict())
