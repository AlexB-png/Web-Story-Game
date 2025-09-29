import sqlite3


def Login(username, password):
    connection = sqlite3.connect("Data.sql")
    cursor = connection.cursor()
    data = cursor.execute("SELECT user,pass FROM data WHERE user=? AND pass=?", (username, password))
    if data.fetchone():
        return True
    else:
        return False

def Create(username, password):
    connection = sqlite3.connect('Data.sql')
    cursor = connection.cursor()
    if Check(username):
        cursor.execute("INSERT INTO data (user , pass) VALUES (? , ?)", (username, password))
        connection.commit()
        return True
    else:
        return False

def Check(username):
    connection = sqlite3.connect("Data.sql")
    cursor = connection.cursor()
    data = cursor.execute("SELECT user FROM data WHERE user=?",(username,))
    return data.fetchone() is None  ## If user exists return False ##

if __name__ == '__main__':
    # THIS IS STRICTLY FOR TESTING PURPOSES #

    # Variables #
    user = input("Username: ")
    password = input("Password: ")
    ##

    print(Create(user, password))

