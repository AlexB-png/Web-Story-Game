import pandas as pd
import os

flag = True

def GetParams():
    data = pd.read_csv(r"testplan\Data.csv")
    TestNum = len(data) + 1
    
    Description = input("Describe the test: ")
    
    Error = input("Was there an error? True or False: ")
    while Error not in ["true", "false", "True", "False"]:
        Error = input("Was there an error? True or False: ")
    
    LineNum = ""
    while type(LineNum) != int:
        try:
            LineNum = int(input("What Line Number: "))
        except:
            print("Try Again.")
    
    Fix = input("What was the fix: ")
    
    Fault = input("Major (Syntax) or Minor(Logic)")
    
    return TestNum, Description, Error, LineNum, Fix, Fault

def main():
    while flag:
        data = pd.read_csv(r"testplan\Data.csv")
        TestNum, Description, Error, LineNum, Fix, Fault = GetParams()
        # TestNum , Description , Error , LineNum , Fix , Fault #
        New_Data = pd.DataFrame(
            {
                "TestNum": TestNum,
                "Description": Description,
                "Error": Error,
                "LineNum": LineNum,
                "Fix": Fix,
                "Fault": Fault
            }, index=[0]
        )
        frames = [data, New_Data]
        Total_Data = pd.concat(frames)
        
        Total_Data.to_csv(r"testplan\Data.csv", index=False)
        os.system("CLS")

if __name__ == '__main__':
    main()