import os as _os
_HERE=_os.path.dirname(_os.path.abspath(__file__))
_ROOT=_os.path.dirname(_HERE)
import pandas as pd
pd.set_option('display.width',240); pd.set_option('display.max_columns',40)
F=_os.path.join(_ROOT,"du_lieu","asd_treEm_GOC.csv")
df=pd.read_csv(F)
print("SHAPE:",df.shape)
print("\nCOLUMNS:")
for i,c in enumerate(df.columns): print(f"  {i:2d}. {c!r}")
print("\nDTYPES/MISSING/NUNIQUE:")
print(pd.DataFrame({'dtype':df.dtypes.astype(str),'miss':df.isna().sum(),'nuniq':df.nunique()}))
print("\nHEAD:"); print(df.head(3).T)
