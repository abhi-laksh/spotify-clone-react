#--- DATE : April 08, 2019 | 22:33:19
#---  ---  By Abhishek Soni 
#--- About (also write in below variable): Execute Sass command
about='Execute Sass command'
print('About :' + about)
import os

curDir = os.getcwd()
dirs = os.walk(curDir)

def checkFile(allDirs):
	scssFile = ""
	cssFile = ""
	for root , d , files in list(allDirs):
		for each in files:
			if each == "main.scss" or each == "style.scss":
				scssFile = os.path.join(root , each)
			if each == "style.css" or each== "main.css":
				cssFile = os.path.join(root , each)
			else:
				continue
	return (scssFile , cssFile) if bool(scssFile) and bool(cssFile) else (None , None)

scssPath , cssPath = checkFile(dirs)

if scssPath !=None and cssPath != None:
	try:
		os.system("sass --watch " + scssPath + ":" + cssPath)
	except Exception as e:
		print(e)

else:
	print("Error in finding the file ! ")
	e = input("Press Enter to exit")
	quit()
