import numpy as np  
import matplotlib.pyplot as plt  
import math


n_groups = 3  


person1_1=(4.0,4.0,5.6,3.8,4.3,3.2)
person1_2=(6.5,3,3,4.7,5.4,6.0,6.0)
person1_3=(5.2,4.0,3.4,3.3,4.4,5.1)

person2_1=(4.9,7.6,7.0,5.2,4.7,6.1)
person2_2=(4.3,4.3,9.5,6.4,6.6,6.6)
person2_3=(4.8,20.3,7.0,4.7,3.4,4.8)

person3_1=(4.1,4.3,8.0,6.0,5.3,5.4)
person3_2=(9.0,5.1,5.5,6.1,4.4,6.5)
person3_3=(4.8,4.7,5.7,7.1,3.9,16.5)


mean=[0]*6
std=[0]*6

for i in range(6):
    k=0
    if(person1_1[i]>2 and person1_1[i]<10):
        mean[i]=mean[i]+person1_1[i]
        k=k+1
        
    if(person1_2[i]>2 and person1_2[i]<10):
        mean[i]=mean[i]+person1_2[i]
        k=k+1
    if(person1_3[i]>2 and person1_3[i]<10):
        mean[i]=mean[i]+person1_3[i]
        k=k+1
    if(person2_1[i]>2 and person2_1[i]<10):
        mean[i]=mean[i]+person2_1[i]
        k=k+1
    if(person2_2[i]>2 and person2_2[i]<10):
        mean[i]=mean[i]+person2_2[i]
        k=k+1
    if(person2_3[i]>2 and person2_3[i]<10):
        mean[i]=mean[i]+person2_3[i]
        k=k+1
    if(person3_1[i]>2 and person3_1[i]<10):
        mean[i]=mean[i]+person3_1[i]
        k=k+1
    if(person3_2[i]>2 and person3_2[i]<10):
        mean[i]=mean[i]+person3_2[i]
        k=k+1
    if(person3_3[i]>2 and person3_3[i]<10):
        mean[i]=mean[i]+person3_3[i]
        k=k+1
    mean[i]=mean[i]/1.0/k

for i in range(6):
    k=0
    if(person1_1[i]>2 and person1_1[i]<10):
        std[i]=std[i]+(person1_1[i]-mean[i])*(person1_1[i]-mean[i])
        k=k+1
    if(person1_2[i]>2 and person1_2[i]<10):
        std[i]=std[i]+(person1_2[i]-mean[i])*(person1_2[i]-mean[i])
        k=k+1
    if(person1_3[i]>2 and person1_3[i]<10):
        std[i]=std[i]+(person1_3[i]-mean[i])*(person1_3[i]-mean[i])
        k=k+1
    if(person2_1[i]>2 and person2_1[i]<10):
        std[i]=std[i]+(person2_1[i]-mean[i])*(person2_1[i]-mean[i])
        k=k+1
    if(person2_2[i]>2 and person2_2[i]<10):
        std[i]=std[i]+(person2_2[i]-mean[i])*(person2_2[i]-mean[i])
        k=k+1
    if(person2_3[i]>2 and person2_3[i]<10):
        std[i]=std[i]+(person2_3[i]-mean[i])*(person2_3[i]-mean[i])
        k=k+1
    if(person3_1[i]>2 and person3_1[i]<10):
        std[i]=std[i]+(person3_1[i]-mean[i])*(person3_1[i]-mean[i])
        k=k+1
    if(person3_2[i]>2 and person3_2[i]<10):
        std[i]=std[i]+(person3_2[i]-mean[i])*(person3_2[i]-mean[i])
        k=k+1
    if(person3_3[i]>2 and person3_3[i]<10):
        std[i]=std[i]+(person3_3[i]-mean[i])*(person3_3[i]-mean[i])
        k=k+1
    std[i]=math.sqrt(std[i]/1.0/k)

means_line =(mean[0],mean[2],mean[4])  
means_bar = (mean[1],mean[3],mean[5])
means_actr=(5.095,3.3,3.67)
#x = np.array([1, 2, 3, 4, 5,6])
#y = np.power(x, 2) # Effectively y = x**2
#e = np.array([1.5, 2.6, 3.7, 4.6, 5.5])

fig, ax = plt.subplots()  
index = np.arange(n_groups)  
bar_width = 0.2  
   
opacity = 0.8  
rects1 = plt.bar(0.8+index, means_line, bar_width,alpha=opacity, color='b',label='Line graph')  
rects2 = plt.bar(0.8+index + bar_width, means_bar, bar_width,alpha=opacity,color='r',label='Bar graph')  

plt.xticks(fontsize=15)
plt.yticks(fontsize=15)

 
plt.ylabel('Time(seconds)',fontsize=20)  
#plt.title('Time comparision',fontsize=20)  
plt.xticks(0.8+index + bar_width, ('Point reading', 'Comparison', 'Trend'))  
plt.xlim(0,4)
plt.ylim(4,7)  
leg=plt.legend()
for t in leg.get_texts():
    t.set_fontsize(15)  
   
plt.tight_layout()  
plt.show()
