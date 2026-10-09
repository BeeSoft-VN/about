import os as _os
_HERE = _os.path.dirname(_os.path.abspath(__file__))
_ROOT = _os.path.dirname(_HERE)          # thu muc BaiTap_PhanTichTamLyHoc
import pandas as pd, numpy as np
from scipy import stats
raw=pd.read_csv(_os.path.join(_ROOT,"du_lieu","student_depression_GOC.csv"))
df=pd.read_csv(_os.path.join(_ROOT,"du_lieu","student_depression_CLEANED.csv"))
f=lambda x,d=1: f"{x:.{d}f}".replace('.',',')
print("--- CHECK CAC CON SO TRICH DAN TRONG DECK ---")
n=len(df)
print("1. Tong ban ghi:", n, "| cot sau xu ly:", df.shape[1])
print("2. Ty le tram cam:", f(df['Depression'].mean()*100), "% | khong:", f((1-df['Depression'].mean())*100),"%")
print("3. Ty le o khuyet goc:", f(raw.isna().mean().mean()*100,3),"% | so o khuyet:", raw.isna().sum().sum())
print("4. Trung lap:", raw.drop(columns=['id']).duplicated().sum())
print("5. Gioi tinh: Nam", f(df[df.Gender=='Male'].Depression.mean()*100), "| Nu", f(df[df.Gender=='Female'].Depression.mean()*100))
r,p=stats.pointbiserialr(df['Depression'],df['Gender_M']); print("   r=",round(r,3)," p=",f(p,2))
print("6. Y dinh tu tu: ty le trong mau", f(df['Suicidal'].mean()*100),"%")
for c,lbl in [('Suicidal','YDTT'),('Academic Pressure','AP'),('Financial Stress','FS'),
              ('Age','Age'),('Work/Study Hours','WSH'),('Diet_Score','Diet'),
              ('Study Satisfaction','SS'),('Sleep_Hours','Sleep'),('FamHistory','Fam'),('CGPA','CGPA')]:
    r,_=stats.pointbiserialr(df['Depression'],df[c]); print(f"   r({lbl}) = {r:+.3f}")
ap=df.groupby('Academic Pressure')['Depression'].mean()*100
print("7. AP 1->5:", [f(v) for v in ap], "| chenh:", f(ap.iloc[-1]-ap.iloc[0],0))
fs=df.groupby('Financial Stress')['Depression'].mean()*100
print("8. FS 1->5:", [f(v) for v in fs], "| chenh:", f(fs.iloc[-1]-fs.iloc[0],0))
sl=df.groupby('Sleep Duration')['Depression'].mean()*100
print("9. Sleep:", {k:f(v) for k,v in sl.items()}, "| chenh <5h vs >8h:", f(sl['Less than 5 hours']-sl['More than 8 hours']))
di=df.groupby('Dietary Habits')['Depression'].mean()*100
print("10. Diet:", {k:f(v) for k,v in di.items()}, "| chenh:", f(di['Unhealthy']-di['Healthy']))
df['AG']=pd.cut(df['Age'],[17,20,23,26,30,60],labels=['18-20','21-23','24-26','27-30','31+'])
ag=df.groupby('AG',observed=True)['Depression'].mean()*100
print("11. Tuoi:", {k:f(v) for k,v in ag.items()}, "| chenh:", f(ag.iloc[0]-ag.iloc[-1]))
df['WB']=pd.cut(df['Work/Study Hours'],[-1,3,6,9,12],labels=['0-3','4-6','7-9','10-12'])
wb=df.groupby('WB',observed=True)['Depression'].mean()*100
print("12. Gio hoc:", {k:f(v) for k,v in wb.items()})
df['nRisk']=((df['Academic Pressure']>=4).astype(int)+(df['Financial Stress']>=4).astype(int)
            +(df['Sleep_Hours']<5).astype(int)+(df['Diet_Score']==3).astype(int)+df['Suicidal'])
nr=df.groupby('nRisk')['Depression'].mean()*100
print("13. nRisk:", {k:f(v) for k,v in nr.items()}, "| ty so:", f(nr.iloc[-1]/nr.iloc[0]), "lan")
ct=pd.crosstab(df['Academic Pressure'],df['Suicidal'],df['Depression'],aggfunc='mean')*100
print("14. Heatmap goc:", f(ct.iloc[0,0]), "->", f(ct.iloc[-1,1]), "| ty so:", f(ct.iloc[-1,1]/ct.iloc[0,0]),"lan")
print("15. Thanh pho hop le (>=10 ban ghi):", (raw['City'].value_counts()>=10).sum(), "| rac:", (raw['City'].map(raw['City'].value_counts())<10).sum())
print("16. Student share:", f((raw['Profession']=='Student').mean()*100,1),"% | WP=0:",f((raw['Work Pressure']==0).mean()*100,2),"% | JS=0:",f((raw['Job Satisfaction']==0).mean()*100,2),"%")
print("17. Others: sleep",(raw['Sleep Duration']=='Others').sum(),"diet",(raw['Dietary Habits']=='Others').sum(),"degree",(raw['Degree']=='Others').sum(),
      "=> tong",(raw['Sleep Duration']=='Others').sum()+(raw['Dietary Habits']=='Others').sum()+(raw['Degree']=='Others').sum())
print("18. Zeros ngoai thang: AP",(raw['Academic Pressure']==0).sum(),"SS",(raw['Study Satisfaction']==0).sum(),"CGPA",(raw['CGPA']==0).sum(),
      "=> tong", (raw['Academic Pressure']==0).sum()+(raw['Study Satisfaction']==0).sum()+(raw['CGPA']==0).sum())
tot_bad = 26+9+10+9+18+12+35+3
print("19. Tong o loi/khuyet:", tot_bad, "| % tren tong o:", f(tot_bad/(raw.shape[0]*raw.shape[1])*100,3),"%")
