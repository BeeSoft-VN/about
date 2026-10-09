import os as _os
_HERE=_os.path.dirname(_os.path.abspath(__file__))
_ROOT=_os.path.dirname(_HERE)
import pandas as pd, numpy as np
pd.set_option('display.width',240)
df=pd.read_csv(_os.path.join(_ROOT,"du_lieu","asd_treEm_CLEANED.csv"))
C=['ChamNoi','KhoHoc','ChamPTTT','VanDeHanhVi','LoAu','TramCam','RoiLoanGen']
print("=== TUONG QUAN GIUA CAC 'ROI LOAN DI KEM' ===")
print(df[C].corr().round(3))
print("\n=== TY LE TRUNG KHOP TUNG CAP (% ban ghi co cung gia tri) ===")
for i in range(len(C)):
    for j in range(i+1,len(C)):
        agree=(df[C[i]]==df[C[j]]).mean()*100
        if agree>90: print(f"  {C[i]:12s} vs {C[j]:12s}: {agree:.1f}% trung khop")
print("\n=== PHAN BO TONG SO 7 ROI LOAN ===")
df['tong7']=df[C].sum(axis=1)
print(df['tong7'].value_counts().sort_index().to_dict())
print("\n=== KIEM TRA: bao nhieu tre co TAT CA 7 hoac KHONG CO cai nao ===")
allyes=(df['tong7']==7).sum(); allno=(df['tong7']==0).sum()
print(f"  Tat ca 7: {allyes} ({allyes/len(df)*100:.1f}%)")
print(f"  Khong cai nao: {allno} ({allno/len(df)*100:.1f}%)")
print(f"  => Hai cuc chiem {(allyes+allno)/len(df)*100:.1f}% mau")
print("\n=== DOI CHIEU: cac bien SANG LOC co hanh xu binh thuong khong? ===")
A=[f'A{i}' for i in range(1,10)]+['A10_Autism_Spectrum_Quotient']
sub=df[A].corr().values[np.triu_indices(10,1)]
print(f"  Tuong quan giua 10 muc AQ: TB {sub.mean():.3f}, max {sub.max():.3f}  (binh thuong: thap-vua)")
print(f"  Phan bo AQ_total: {df['AQ_total'].value_counts().sort_index().to_dict()}")
