import matplotlib.pyplot as plt
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import os


print cv2.__version__



for j in range(1,21):
    imagename="eyetribediagram"+str(j)+".png"
    outputfile="output"+str(j)+".txt"
    im=Image.open(imagename)
    
    clustersx=[]
    currentclusterx=[]
    clustersy=[]
    currentclustery=[]

    gazepointsx=[]
    gazepointsy=[]

    startx=0
    starty=0
    
    startcluster=0
    draw = ImageDraw.Draw(im) 



    testsite_arrayx = []
    testsite_arrayy = []
    previousx=-1
    previousy=-1

    font=ImageFont.truetype("arial.ttf", 30)



    with open(outputfile) as my_file:
        for line in my_file:
            temp=line.split("\t")
        
            if len(temp)==3:
                testsite_arrayx.append(temp[0])
                testsite_arrayy.append(temp[1])
            
                x=abs(int(float(temp[0])))
                y=abs(int(float(temp[1])))
                if x!=0 and y!=0:
                    if previousx!=-1:
                        #draw.line((previousx,previousy, x,y), fill=(0,0,0))
                        #draw.ellipse((x-2, y-2, x+2, y+2),fill=(255,0,255))
                        if((x-previousx)*(x-previousx)+(y-previousy)*(y-previousy)<20000):
                            if(startcluster==0):
                                
     
                                startcluster=1
 
                                currentclusterx.append(previousx)
                                currentclustery.append(previousy)
                                currentclusterx.append(x)
                                currentclustery.append(y)
                            else:
                                currentclusterx.append(x)
                                currentclustery.append(y)
                        else:
                            startcluster=0
                            if(len(currentclusterx)>2):
                                clustersx.append(currentclusterx)
                                clustersy.append(currentclustery)
                                currentclusterx=[]
                                currentclustery=[]
                            else:
                                currentclusterx=[]
                                currentclustery=[]
                                
                        #cv2.line(img,(previousx,previousy),(x,y),(221,221,221),1)
                        #cv2.circle(img,(x,y),2,(221,221,221),-1)
                    else:
                       draw.ellipse((x-8, y-8, x+8, y+8),fill=(255,0,255))
                       startx=x
                       starty=y
                    previousx=x
                    previousy=y

        
        for i in range(len(clustersx)):
            currentclusterx=clustersx[i]
            currentclustery=clustersy[i]
            gazepointsx.append(sum(currentclusterx)/float(len(currentclusterx)))
            gazepointsy.append(sum(currentclustery)/float(len(currentclustery)))

        #print gazepointsx
        #print gazepointsy
        previousx=startx
        previousy=starty
        for i in range(len(gazepointsx)):
            draw.text((gazepointsx[i], gazepointsy[i]),str(i),(255,0,255),font=font)
            if previousx!=-1:
                x=gazepointsx[i]
                y=gazepointsy[i]
                draw.line((previousx,previousy, x,y), fill=(0,0,0))
                draw.ellipse((x-2, y-2, x+2, y+2),fill=(0,0,0))
                previousx=x
                previousy=y
            else:
                draw.ellipse((x-2, y-2, x+2, y+2),fill=(0,0,0))
                previousx=x
                previousy=y
            
            
    #cv2.imshow('image',img)           
    #cv2.imshow('image',img)
    #k = cv2.waitKey(0)
    #if k == 27:         # wait for ESC key to exit
    #    cv2.destroyAllWindows()
    #elif k == ord('s'): # wait for 's' key to save and exit
    #    cv2.imwrite('eyetribe1l.jpeg',img)
    #    cv2.destroyAllWindows()
    savefie="test"+str(j)+".png"
    im.save(savefie)
#res=cv2.resize(img,(width/2, height/2), interpolation = cv2.INTER_LINEAR)
#res2=res.copy()
#fig, ax = plt.subplots()
#ax.invert_yaxis()
#ax.xaxis.tick_top()

#plt.imshow(res2, cmap = 'gray', interpolation = 'bicubic')
#plt.xticks([]), plt.yticks([])  # to hide tick values on X and Y axis
#plt.show()




