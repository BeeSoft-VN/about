import os as _os
_HERE = _os.path.dirname(_os.path.abspath(__file__))
_ROOT = _os.path.dirname(_HERE)          # thu muc BaiTap_PhanTichTamLyHoc
import pandas as pd, numpy as np
pd.set_option('display.width',200); pd.set_option('display.max_rows',100)
DATA=_os.path.join(_ROOT,"du_lieu","student_depression_GOC.csv")
df = pd.read_csv(DATA)

print("=== CITY: rare/invalid levels (<=5 rows) ===")
vc = df['City'].value_counts()
print(vc[vc<=5].to_dict())
print("\n=== Zero / out-of-scale values on 1-5 Likert items ===")
for c in ['Academic Pressure','Study Satisfaction','Financial Stress']:
    print(f"{c}: zeros={(df[c]==0).sum()}, dist={sorted(df[c].dropna().unique())}")
print(f"CGPA == 0 : {(df['CGPA']==0).sum()} rows ; CGPA>10: {(df['CGPA']>10).sum()}")
print("\nCGPA=0 rows sample:"); print(df[df['CGPA']==0][['Age','Degree','CGPA','Academic Pressure','Depression']].head())

print("\n=== Near-constant columns ===")
for c in ['Work Pressure','Job Satisfaction','Profession']:
    top = df[c].value_counts(normalize=True).iloc[0]
    print(f"{c}: dominant value share = {top*100:.3f}%  -> {df[c].value_counts().index[0]}")

print("\n=== Non-student rows ===", (df['Profession']!='Student').sum())
print("Work Pressure>0 rows:", (df['Work Pressure']>0).sum(), "| Job Satisfaction>0 rows:", (df['Job Satisfaction']>0).sum())

print("\n=== 'Others' junk levels ===")
print("Sleep 'Others':", (df['Sleep Duration']=='Others').sum(), "| Diet 'Others':", (df['Dietary Habits']=='Others').sum())
print("\nDegree 'Others':", (df['Degree']=='Others').sum())
print("\n=== Age outliers ===")
print(df['Age'].describe())
print("Age>40:", (df['Age']>40).sum(), " Age>35:", (df['Age']>35).sum())
