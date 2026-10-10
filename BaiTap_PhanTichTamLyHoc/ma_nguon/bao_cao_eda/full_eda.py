import pandas as pd, numpy as np
from scipy import stats
pd.set_option('display.width',240); pd.set_option('display.max_columns',60)
F="/home/user/about/BaiTap_PhanTichTamLyHoc/du_lieu/student_depression_GOC.csv"
df=pd.read_csv(F)
vn=lambda x,d=1: f"{x:,.{d}f}".replace(",","\x00").replace(".",",").replace("\x00",".")

print("### 1. TONG QUAN")
print(f"shape={df.shape}  bo nho={df.memory_usage(deep=True).sum()/1024**2:.2f} MB")
print(f"so o = {df.shape[0]*df.shape[1]:,}")
NUM=df.select_dtypes(include='number').columns.tolist()
CAT=[c for c in df.columns if c not in NUM]
print(f"cot so ({len(NUM)}): {NUM}")
print(f"cot chu ({len(CAT)}): {CAT}")

print("\n### 2. CHAT LUONG")
print(f"o khuyet tong={df.isna().sum().sum()} | dong trung (bo id)={df.drop(columns=['id']).duplicated().sum()}")
m=df.isna().sum(); m=m[m>0]
for c,v in m.items(): print(f"  {c}: {v} o ({vn(v/len(df)*100,3)}%)")
print("cot gan hang so (>95%):")
for c in df.columns:
    top=df[c].value_counts(normalize=True,dropna=False).iloc[0]
    if top>0.95: print(f"  {c}: {vn(top*100,2)}% la '{df[c].value_counts().index[0]}'")

print("\n### 3. DON BIEN - BIEN SO")
d=df[NUM].describe().T
d['skew']=df[NUM].skew(); d['kurt']=df[NUM].kurtosis()
d['n_unique']=df[NUM].nunique()
print(d.round(3).to_string())
print("\nNgoai lai theo quy tac IQR (1,5*IQR):")
for c in NUM:
    if c=='id': continue
    q1,q3=df[c].quantile([.25,.75]); iqr=q3-q1
    lo,hi=q1-1.5*iqr,q3+1.5*iqr
    n=((df[c]<lo)|(df[c]>hi)).sum()
    print(f"  {c:22s} IQR=[{q1:.2f},{q3:.2f}] nguong=[{lo:.2f},{hi:.2f}] ngoai lai={n} ({vn(n/len(df)*100,2)}%)")

print("\n### 4. DON BIEN - BIEN PHAN LOAI")
for c in CAT:
    vc=df[c].value_counts()
    print(f"\n  {c}: {df[c].nunique()} gia tri | pho bien nhat '{vc.index[0]}' ({vn(vc.iloc[0]/len(df)*100)}%)")
    if df[c].nunique()<=6:
        for k,v in vc.items(): print(f"      {k}: {v} ({vn(v/len(df)*100)}%)")
    else:
        print(f"      top5: {dict(list(vc.head(5).items()))}")
        rare=vc[vc<10]
        if len(rare): print(f"      gia tri hiem (<10 lan): {len(rare)} nhan, tong {rare.sum()} dong")

print("\n### 5. BIEN MUC TIEU")
v=df['Depression'].value_counts()
print(f"  1 (tram cam)={v[1]} ({vn(v[1]/len(df)*100)}%) | 0={v[0]} ({vn(v[0]/len(df)*100)}%) | ty so {vn(v[1]/v[0],2)}:1")

print("\n### 6. HAI BIEN - BIEN SO vs MUC TIEU")
rows=[]
for c in NUM:
    if c in ('id','Depression'): continue
    r,p=stats.pointbiserialr(df['Depression'],df[c])
    g0,g1=df[df.Depression==0][c],df[df.Depression==1][c]
    t,pt=stats.ttest_ind(g1,g0,equal_var=False)
    rows.append((c,round(r,3),f"{p:.1e}",round(g0.mean(),2),round(g1.mean(),2),f"{pt:.1e}"))
print(pd.DataFrame(rows,columns=['Bien','r','p(corr)','TB nhom 0','TB nhom 1','p(t-test)'])
      .sort_values('r',key=abs,ascending=False).to_string(index=False))

print("\n### 7. HAI BIEN - BIEN PHAN LOAI vs MUC TIEU")
rows=[]
for c in CAT:
    if df[c].nunique()>30: continue
    ct=pd.crosstab(df[c],df['Depression'])
    if ct.shape[0]<2: continue
    chi2,p,dof,_=stats.chi2_contingency(ct)
    V=np.sqrt(chi2/(len(df)*(min(ct.shape)-1)))
    rate=df.groupby(c)['Depression'].mean()*100
    rows.append((c,df[c].nunique(),round(chi2,1),f"{p:.1e}",round(V,3),
                 f"{rate.min():.1f}–{rate.max():.1f}"))
print(pd.DataFrame(rows,columns=['Bien','k','chi2','p','CramerV','Khoang ty le %'])
      .sort_values('CramerV',ascending=False).to_string(index=False))

print("\n### 8. TUONG QUAN GIUA CAC BIEN DOC LAP (da cong tuyen)")
X=[c for c in NUM if c not in ('id','Depression')]
M=df[X].corr()
hi=[(X[i],X[j],round(M.iloc[i,j],3)) for i in range(len(X)) for j in range(i+1,len(X)) if abs(M.iloc[i,j])>0.3]
print(f"  cap co |r|>0,3: {hi if hi else 'KHONG CO — cac bien doc lap gan nhu khong tuong quan voi nhau'}")
print(f"  |r| lon nhat giua cac bien doc lap: {max(abs(M.iloc[i,j]) for i in range(len(X)) for j in range(i+1,len(X))):.3f}")

print("\n### 9. GIA TRI NGOAI THANG DO / BAT KHA THI")
for c,lo,hi_ in [('Academic Pressure',1,5),('Study Satisfaction',1,5),('Financial Stress',1,5),
                 ('Work Pressure',0,5),('Job Satisfaction',0,4),('CGPA',0.01,10),('Age',15,80),('Work/Study Hours',0,24)]:
    bad=((df[c]<lo)|(df[c]>hi_)).sum()
    if bad: print(f"  {c}: {bad} gia tri ngoai [{lo},{hi_}]  -> vi du {sorted(df.loc[(df[c]<lo)|(df[c]>hi_),c].unique())[:6]}")
