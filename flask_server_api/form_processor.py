import platform
import logging

from selenium import webdriver
from selenium.webdriver.chrome.options import Options as chrome_options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


options = chrome_options()
options.add_argument("--window-size=1080,720")

def get_default_browser():
    os_name = platform.system()
    logging.debug("OS detected: %s", os_name)
    chrome_driver = None
    if os_name.lower() == "windows":
        chrome_driver = webdriver.Chrome(options=options)
    return chrome_driver

try:
    driver = get_default_browser()
    if not driver:
        raise Exception("Failed to init chromedriver")
    url = "http://localhost:5173/"
    driver.get(url)
    wait = WebDriverWait(driver, 5)
    contact_button = wait.until(EC.element_to_be_clickable(By.XPATH, ))
    user_input = input("Press q to exit and close")
    if user_input == 'q':
        driver.quit()
except Exception as e:
    logging.error("Error occurred %s", str(e))
finally:
    if "driver" in locals():
        driver.quit()