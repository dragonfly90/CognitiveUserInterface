import json
import Quandl
#mydata = Quandl.get("FED/RXI_N_A_CH")
#mydata.to_csv("data.csv", sep='\t', encoding='utf-8')
#mydata = Quandl.get("FED/RXI_N_A_HK")
#mydata.to_csv("data2.csv", sep='\t', encoding='utf-8')
#with open('data.txt', 'w') as outfile:
#with open('data.txt', 'w') as outfile:
#    json.dump(mydata, outfile)
#print mydata

mydata = Quandl.get("OICA/SALES_CV_DENMARK")
print 'Denmark'
print mydata
mydata = Quandl.get("OICA/SALES_CV_CHINA")
print 'China'
print  mydata
mydata = Quandl.get("OICA/SALES_CV_UNITEDSTATESOFAMERICA")
print 'US'
print  mydata
mydata = Quandl.get("OICA/SALES_CV_INDIA")
print 'India'
print mydata
