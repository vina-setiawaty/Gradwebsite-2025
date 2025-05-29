import json

with open("data_280525.json", "r") as file1:
    data = json.load(file1)

# with open("piclink.json", "r") as file2:
#     links = json.load(file2)

# found = False    

# for row in data:
#     orilink = (row["picture"]).split("/")
#     for link in links:
#         namelink = (link).split("/")
#         if not found:
#             if namelink[-1] == orilink[-1]:
#                 row["desktopPic"] = link
#                 found = True
#     found = False]

    for row in data:
        row["links"] = ["Email"] + row["Which of these links you want on your Gradsite profile (max 2)"].split(",")
        row["Iconfile"] = "./assets/indiv_icons/" + row["Iconfile"]
        row["Portrait"] = "./assets/portraits/" + row["Portrait"].split('/')[-1]
        if "postimg" in row["MainPic"]:
            row["MainPic"] = "./assets/projects/" + row["MainPic"].split('/')[-1]
        if row["2nd pic (16:9) Landscape"] != "":
            row["2nd pic (16:9) Landscape"] = "./assets/projects/" + row["2nd pic (16:9) Landscape"].split('/')[-1]
        if row["3rd Pic (3:4) Portrait"] != "":
            row["3rd Pic (3:4) Portrait"] = "./assets/projects/" + row["3rd Pic (3:4) Portrait"].split('/')[-1]
        if row["Picture_1 3:4"] != "":
            row["Picture_1 3:4"] = "./assets/projects/" + row["Picture_1 3:4"].split('/')[-1]
        if row["Picture_2 3:4"] != "":
            row["Picture_2 3:4"] = "./assets/projects/" + row["Picture_2 3:4"].split('/')[-1]
        if row["Picture_3 3:4"] != "":
            row["Picture_3 3:4"] = "./assets/projects/" + row["Picture_3 3:4"].split('/')[-1]

    
print(data[0])
# print(type(data))
# print(type(data[0]))

with open("processingData3.json", "w") as file:
    json.dump(data, file, indent=4)

