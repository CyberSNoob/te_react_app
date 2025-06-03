class DataNotFoundError(Exception):
    def __init__(self, message="Requested data was not found"):
        super().__init__(message)
        self.message = message

    def __str__(self):
        return self.message