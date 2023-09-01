from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
import os
import base64
from datetime import datetime
# Create your views here.



def index(request):
    
    
    
    return render(request,"recognize/index.html")

def process_data(request):
    
    if request.method =="POST":
        file=request.POST.get("image")
        if file is not None:
            file=file.replace('data:image/jpeg;base64,','')
            image_data=base64.b64decode(file)
            
            full_path=create_file(image_data)
            data=extract_content(full_path)
            if data == "":
                return JsonResponse({"success":False,"message":"failed to decode image","data":data})
            else:
                log_user(data)
                return JsonResponse({"success":True,"data":data})
    
        else:
            return JsonResponse({"success":False,"message":"Image not found"})
            
def create_file(image_data):
    full_path=os.path.join(settings.BASE_DIR,"image.png")
    with open(full_path,"wb") as f2:
        f2.write(image_data)
    return full_path

def extract_content(full_path):
        folder=os.path.join(settings.BASE_DIR , "temp")
        if not os.path.exists(folder):
            os.makedirs(folder)
        filename=os.path.join(folder,os.path.splitext(os.path.basename(full_path))[0]+".txt")
        if   os.path.exists(full_path):
                os.system(f"pytesseract -l eng {full_path} > {filename}")
                return get_data(filename)

def get_data(full_path):
        with open(full_path,"r") as f:
            content=f.readlines()
            details=[]
            content=[element.replace("\n","") for element in content]
            details=[element.strip() for element in content if element.strip()]
            
            details=[element for element in details if len(element)>1]
            return '' if len(details) <1 else details[0]
def log_user(user):
    folder=os.path.join(settings.BASE_DIR,"logs")
    file=os.path.join(folder,"logs.csv")
    
    if  not os.path.exists(file):
        os.makedirs(folder)
        with open(file,"w") as f:
            f.write("username,Date\n")
            f.close()
    with open(file,"a") as f2:
        date=datetime.now()
        f2.write(f"{user},{date}\n")
        f2.close()
    
            
        