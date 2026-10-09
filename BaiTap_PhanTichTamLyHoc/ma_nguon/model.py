import os as _os
_HERE = _os.path.dirname(_os.path.abspath(__file__))
_ROOT = _os.path.dirname(_HERE)          # thu muc BaiTap_PhanTichTamLyHoc
import pandas as pd, numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import roc_auc_score, accuracy_score, classification_report, confusion_matrix
df=pd.read_csv(_os.path.join(_ROOT,"du_lieu","student_depression_CLEANED.csv"))
F=['Academic Pressure','Financial Stress','Study Satisfaction','Sleep_Hours','Diet_Score',
   'Work/Study Hours','CGPA','Age','Suicidal','FamHistory','Gender_M']
X=df[F]; y=df['Depression']
Xtr,Xte,ytr,yte=train_test_split(X,y,test_size=.25,random_state=42,stratify=y)
sc=StandardScaler().fit(Xtr)
lr=LogisticRegression(max_iter=2000).fit(sc.transform(Xtr),ytr)
pl=lr.predict(sc.transform(Xte)); prl=lr.predict_proba(sc.transform(Xte))[:,1]
print("=== LOGISTIC REGRESSION ===")
print(f"Accuracy={accuracy_score(yte,pl):.4f}  AUC={roc_auc_score(yte,prl):.4f}")
print(f"CV-5 AUC = {cross_val_score(lr,sc.transform(X),y,cv=5,scoring='roc_auc').mean():.4f}")
print(classification_report(yte,pl,target_names=['Khong tram cam','Tram cam'],digits=3))
print("Confusion matrix:\n",confusion_matrix(yte,pl))

print("\n=== HE SO (Odds Ratio, chuan hoa) ===")
co=pd.DataFrame({'Bien':F,'coef':lr.coef_[0],'OddsRatio':np.exp(lr.coef_[0])}).sort_values('coef',key=abs,ascending=False)
print(co.round(3).to_string(index=False))

rf=RandomForestClassifier(n_estimators=300,random_state=42,n_jobs=-1,min_samples_leaf=5).fit(Xtr,ytr)
prr=rf.predict_proba(Xte)[:,1]
print(f"\n=== RANDOM FOREST === Accuracy={accuracy_score(yte,rf.predict(Xte)):.4f}  AUC={roc_auc_score(yte,prr):.4f}")
imp=pd.DataFrame({'Bien':F,'Importance':rf.feature_importances_}).sort_values('Importance',ascending=False)
print(imp.round(4).to_string(index=False))
imp.to_csv(_os.path.join(_HERE,"importance.csv"),index=False); co.to_csv(_os.path.join(_HERE,"coef.csv"),index=False)

print("\n\n=== HO SO RUI RO TO HOP ===")
df['HighAP']=df['Academic Pressure']>=4; df['HighFS']=df['Financial Stress']>=4
g=df.groupby(['HighAP','HighFS','Suicidal'])['Depression'].agg(['mean','count'])
g['mean']=(g['mean']*100).round(1); print(g)

print("\n=== SO YEU TO NGUY CO (0-5) ===")
df['nRisk']=((df['Academic Pressure']>=4).astype(int)+(df['Financial Stress']>=4).astype(int)
            +(df['Sleep_Hours']<5).astype(int)+(df['Diet_Score']==3).astype(int)+df['Suicidal'])
r=df.groupby('nRisk')['Depression'].agg(['mean','count']); r['mean']=(r['mean']*100).round(1)
print(r.rename(columns={'mean':'TyLe%','count':'N'}))
r.to_csv(_os.path.join(_HERE,"nrisk.csv"))

print("\n=== BAO VE: it yeu to nguy co + ngu du + an lanh manh ===")
prot=df[(df['nRisk']==0)]
print(f"Nhom 0 yeu to nguy co: N={len(prot)}, ty le tram cam={prot['Depression'].mean()*100:.1f}%")
