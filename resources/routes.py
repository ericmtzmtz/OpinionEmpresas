from .empresa import EmpresasApi, EmpresaApi
from .auth import SignupApi, LoginApi
from .opinion import OpinionesApi, OpinionApi

def initialize_routes(api):
    api.add_resource(EmpresasApi, '/api/empresas')
    api.add_resource(EmpresaApi, '/api/empresas/<id>')

    api.add_resource(OpinionesApi, '/api/opiniones')
    api.add_resource(OpinionApi, '/api/opiniones/<id>')

    api.add_resource(SignupApi, '/api/auth/signup')
    api.add_resource(LoginApi, '/api/auth/login')