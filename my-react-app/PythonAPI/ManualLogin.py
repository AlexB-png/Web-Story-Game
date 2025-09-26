import sqlite3

def Login():




if __name__ == '__main__':
    # THIS IS STRICTLY FOR TESTING PURPOSES #
    
    # Connection to PySQL database #
    connection = sqlite3.connect(r"my-react-app\Data.sql")
    ##

    # Makes the cursor to execute commands #
    cursor = connection.cursor()
    ##
    
    selection = int(input("1:Create, 2:Login"))
    username = input("Username:")
    password = input("Password:")

    if selection == 1:
        stats = int(input("Statistics Integer:"))
        cursor.execute("INSERT INTO movie VALUES(?, ?, ?)", [username, password, stats])

        connection.commit()
    else:
        data = cursor.execute
        ("SELECT title,year,score FROM movie WHERE title=? AND year=?", (username, password))
        print(data.fetchone())
