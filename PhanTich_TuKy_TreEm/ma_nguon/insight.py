import os as _os
_HERE=_os.path.dirname(_os.path.abspath(__file__))
_ROOT=_os.path.dirname(_HERE)
import pandas as pd, numpy as np
from scipy import stats
pd.set_option('display.width',240)
df=pd.read_csv(_os.path.join(_ROOT,"du_lieu","asd_treEm_CLEANED.csv"))
n=len(df); asd=df[df.ASD==1]
print(f"N={n} tre | co dau hieu ASD={len(asd)} ({len(asd)/n*100:.1f}%)\n")

print("=== A. TUOI SANG LOC — CUA SO CAN THIEP SOM ===")
for thr,lbl in [(3,'<=3 tuoi (cua so vang)'),(6,'<=6 tuoi (truoc tieu hoc)'),(11,'<=11 tuoi')]:
    k=(df.Age_Years<=thr).sum(); ka=(asd.Age_Years<=thr).sum()
    print(f"  {lbl:28s}: toan mau {k:4d} ({k/n*100:4.1f}%) | nhom ASD {ka:4d} ({ka/len(asd)*100:4.1f}%)")
print(f"  Tuoi trung vi khi sang loc: toan mau {df.Age_Years.median():.0f} | nhom ASD {asd.Age_Years.median():.0f}")
print(f"  => {(asd.Age_Years>6).mean()*100:.1f}% tre ASD duoc sang loc SAU tuoi vao lop 1")

print("\n=== B. KENH SANG LOC ===")
w=df.groupby('Who_completed_the_test').agg(n=('ASD','size'),ty_le=('ASD','mean'),tuoi_TV=('Age_Years','median'))
w['ty_le']=(w['ty_le']*100).round(1); w['%mau']=(w['n']/n*100).round(1)
print(w.sort_values('n',ascending=False))
sch=df[df.Who_completed_the_test=='School And Ngo']
print(f"  => Truong hoc/NGO chi chiem {len(sch)}/{n} = {len(sch)/n*100:.1f}% so lan sang loc")

print("\n=== C. GIOI TINH ===")
for s,lbl in [('M','Nam'),('F','Nu')]:
    g=df[df.Sex==s]
    print(f"  {lbl}: n={len(g)} | ty le ASD {g.ASD.mean()*100:.1f}% | AQ_total TB {g.AQ_total.mean():.2f} | tuoi TV {g.Age_Years.median():.0f}")
ct=pd.crosstab(df.Sex,df.ASD); chi2,p,_,_=stats.chi2_contingency(ct)
print(f"  Ty so nam:nu trong mau = {(df.Sex=='M').sum()/(df.Sex=='F').sum():.2f}:1 | chi2 p={p:.3f}")
ga=asd.groupby('Sex').Age_Years.median()
print(f"  Tuoi trung vi khi phat hien (nhom ASD): Nam {ga.get('M'):.0f} - Nu {ga.get('F'):.0f}")

print("\n=== D. SUC MANH PHAN BIET CUA TUNG MUC SANG LOC ===")
A=[f'A{i}' for i in range(1,10)]+['A10_Autism_Spectrum_Quotient']
rows=[]
for c in A:
    pa,pn=asd[c].mean()*100, df[df.ASD==0][c].mean()*100
    r,_=stats.pointbiserialr(df.ASD,df[c])
    rows.append((c.replace('_Autism_Spectrum_Quotient',''),round(pa,1),round(pn,1),round(pa-pn,1),round(r,3)))
t=pd.DataFrame(rows,columns=['Muc','ASD%','Khong%','Chenh','r']).sort_values('Chenh',ascending=False)
print(t.to_string(index=False))
print(f"  => Muc A10 yeu bat thuong (chenh {t[t.Muc=='A10'].Chenh.iloc[0]} so voi TB {t[t.Muc!='A10'].Chenh.mean():.1f} cua 9 muc con lai)")

print("\n=== E. NGUONG AQ_total ===")
for k in range(3,9):
    sub=df[df.AQ_total>=k]
    sens=(asd.AQ_total>=k).mean()*100; spec=(df[df.ASD==0].AQ_total<k).mean()*100
    print(f"  AQ>={k}: bat duoc {sens:5.1f}% ca ASD | loai dung {spec:5.1f}% ca khong ASD | ppv {sub.ASD.mean()*100:5.1f}%")

print("\n=== F. TUONG QUAN CAC THANG DO (du lieu tin cay) ===")
for c in ['AQ_total','Qchat_10_Score','Social_Responsiveness_Scale','Childhood Autism Rating Scale']:
    r,p=stats.pointbiserialr(df.ASD,df[c]); print(f"  {c:32s} r={r:+.3f} p={p:.1e}")
print(f"  AQ_total vs Qchat: r={df.AQ_total.corr(df.Qchat_10_Score):+.3f}")
print(f"  AQ_total vs SRS  : r={df.AQ_total.corr(df.Social_Responsiveness_Scale):+.3f}")
print(f"  AQ_total vs CARS : r={df.AQ_total.corr(df['Childhood Autism Rating Scale']):+.3f}")

print("\n=== G. TIEN SU GIA DINH & VANG DA SO SINH ===")
for v,lbl in [('TienSuGD','Co nguoi than mac ASD'),('VangDa','Vang da so sinh')]:
    g=df.groupby(v).ASD.agg(['mean','size']); g['mean']=(g['mean']*100).round(1)
    ct=pd.crosstab(df[v],df.ASD); chi2,p,_,_=stats.chi2_contingency(ct)
    print(f"  {lbl}: khong={g.loc[0,'mean']}% (n={g.loc[0,'size']}) | co={g.loc[1,'mean']}% (n={g.loc[1,'size']}) | p={p:.4f}")
