import os as _os
_HERE = _os.path.dirname(_os.path.abspath(__file__))
_ROOT = _os.path.dirname(_HERE)          # thu muc BaiTap_PhanTichTamLyHoc
import pandas as pd, numpy as np
pd.set_option('display.width', 200); pd.set_option('display.max_columns', 50)
DATA=_os.path.join(_ROOT,"du_lieu","student_depression_GOC.csv")
df = pd.read_csv(DATA)
print("SHAPE:", df.shape)
print("\n=== DTYPES & MISSING ===")
info = pd.DataFrame({'dtype':df.dtypes.astype(str),'missing':df.isna().sum(),
                     'miss%':(df.isna().mean()*100).round(3),'nunique':df.nunique()})
print(info)
print("\n=== DUPLICATES (full row) ===", df.duplicated().sum())
print("=== DUPLICATES (excl id) ===", df.drop(columns=['id']).duplicated().sum())
print("\n=== TARGET ===")
print(df['Depression'].value_counts(dropna=False))
print((df['Depression'].value_counts(normalize=True)*100).round(2))
print("\n=== NUMERIC DESCRIBE ===")
print(df.describe().T.round(3))
print("\n=== CATEGORICAL VALUE COUNTS ===")
for c in df.select_dtypes(include='object').columns:
    vc = df[c].value_counts()
    print(f"\n--- {c} ({df[c].nunique()} unique) ---")
    print(vc.head(15))
    if df[c].nunique()>15: print("... rare tail count:", (vc<=5).sum(), "levels with <=5 rows, total rows:", vc[vc<=5].sum())
