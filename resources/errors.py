class InternalServerError(Exception):
    pass

class SchemaValidationError(Exception):
    pass

class EmpresaAlreadyExistError(Exception):
    pass

class UpdatingEmpresaError(Exception):
    pass

class DeletingEmpresaError(Exception):
    pass

class EmpresaNotExistsError(Exception):
    pass

class EmailAlreadyExistsError(Exception):
    pass

class UnauthorizedError(Exception):
    pass

class UnauthorizedCreation(Exception):
    pass

errors = {
    "InternalServerError": {
        "message": "Something went wrong",
        "status": 500
    },
     "SchemaValidationError": {
         "message": "Request is missing required fields",
         "status": 400
     },
     "EmpresaAlreadyExistsError": {
         "message": "Empresa with given name already exists",
         "status": 500
     },
     "UpdatingEmpresaError": {
         "message": "Updating empresa added by other is forbidden",
         "status": 403
     },
     "DeletingEmpresaError": {
         "message": "Deleting empresa added by other is forbidden",
         "status": 403
     },
     "EmpresaNotExistsError": {
         "message": "Empresa with given id doesn't exists",
         "status": 400
     },
     "EmailAlreadyExistsError": {
         "message": "User with given email address already exists",
         "status": 400
     },
     "UnauthorizedError": {
         "message": "Invalid username or password",
         "status": 401
     },
     "UnauthorizedCreation": {
         "message": "Missing Authorization",
         "status": 500
     }
}
