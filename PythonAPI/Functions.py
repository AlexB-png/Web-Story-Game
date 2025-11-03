import sqlite3  # type: ignore
import bcrypt  # type: ignore
import random


def Login(username, password):
    with sqlite3.connect('Data.db') as connection:
        cursor = connection.cursor()

        data = cursor.execute("SELECT user,pass FROM users WHERE user=?", (username,)).fetchone()

        if not data:
            print("Invalid Username")
            return False
        else:
            EncryptedPass = data[1]
            EncodedPass = password.encode("UTF-8")
            return bcrypt.checkpw(EncodedPass, EncryptedPass)


def Create(username, password):
    if CheckNotUser(username):  # User doesn't exist = True #
        print("Succeesed to checknotuser")
        if len(username) > 3 and len(password) > 3:
            salt = bcrypt.gensalt()
            password = bcrypt.hashpw(bytes(password.encode('UTF-8')), salt)

            SecretCode = random.randint(1000000000, 9999999999)  # TBA change this for more security #

            with sqlite3.connect('Data.db') as connection:
                cursor = connection.cursor()
                cursor.execute("INSERT INTO users (user , pass, secret_code) VALUES (? , ?, ?)", (username, password, SecretCode))
                connection.commit()
            return True, "Account Successfully Created"
        else:
            return False, "Username or password Too Short"
    else:
        return False, "Username Already In Use"


def CheckNotUser(username):
    with sqlite3.connect("Data.db", timeout=1) as connection:
        cursor = connection.cursor()
        data = cursor.execute("SELECT user FROM users WHERE user=?", (username,))
        x = data.fetchone()
    return x is None  # If user exists return False #


def CheckSecretCode(user, code):
    with sqlite3.connect('Data.db') as connection:
        cursor = connection.cursor()
        data = cursor.execute("SELECT user FROM users WHERE user=? AND secret_code=?", (user, code)).fetchone()
    return data is None  # If user and code correct, return False #


def Change(username, password, code):
    # Check User Exists #
    prescence = CheckNotUser(username)
    # print(prescence)

    if not prescence:  # CheckNotUser returns True if user doesn't exist #
        ValidCode = CheckSecretCode(username, code)
        # print(ValidCode)

        if not ValidCode:
            with sqlite3.connect('Data.db') as connection:
                cursor = connection.cursor()
                
                # Encryption #
                salt = bcrypt.gensalt()
                password = bcrypt.hashpw(password.encode('UTF-8'), salt)
                ##

                # Update password
                cursor.execute("UPDATE users SET pass=? WHERE user=?", (password, username))
                connection.commit()
            return True, "Successfully changed password"
        else:
            return False, "Incorrect Secret Code"
    else:
        return False, "Username doesn't exist"


def test():
    # Variables #
    user = input("Username: ")
    password = input("Password: ")
    code = input("Code: ")
    Create(user, password)


def init_db():
    connection = sqlite3.connect(r"Data.db")
    cursor = connection.cursor()
    try: 
        cursor.execute("SELECT * from users")
    except:
        print("failed To connect to database")
        cursor.execute("CREATE TABLE users(user, pass, secret_code)")
    connection.close()


def DeleteAccount(username):
    connection = sqlite3.connect(r"Data.db")
    cursor = connection.cursor()

    cursor.execute("DELETE FROM users WHERE user = (?)", (username,))
    connection.commit()
    return True


if __name__ == '__main__':
    DeleteAccount("TEST3")
