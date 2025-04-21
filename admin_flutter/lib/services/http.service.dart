import 'package:admin_flutter/config/appConfig.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';

class HttpService {
  final Dio _dio = Dio();
  AppConfig? _appConfig;
  String? _base_url;
  late String? _token = "";

  HttpService() {
    _appConfig = GetIt.instance.get<AppConfig>();
    _base_url = _appConfig!.API_URL;
    _configureInterceptors();
  }

  void setToken(String token) {
    _token = token;
    print("token: $_token");
  }

  void _configureInterceptors() {
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) {
          // Add auth header if token exists
          if (_token != null && _token!.isNotEmpty) {
            options.headers['Authorization'] = 'Bearer $_token';
          }
          return handler.next(options);
        },
      ),
    );
  }

  Future<Response?> get(String path) async {
    try {
      String url = "$_base_url$path";

      print("token: $_token");

      Response response = await _dio.get(
        url,
        options: Options(headers: {'Authorization': 'Bearer $_token'}),
      );
      return response;
    } catch (e) {
      print('HTTPService: Unable to perform get request.');
      print(e);
      return null;
    }
  }

  Future<Response?> post(String path, dynamic data) async {
    try {
      String url = "$_base_url$path";
      Response response = await _dio.post(
        url,
        data: data,
        options: Options(headers: {'Authorization': 'Bearer $_token'}),
      );
      return response;
    } catch (e) {
      print('HTTPService: Unable to perform post request.');
      print(e);
      return null;
    }
  }

  Future<Response?> put(String path, dynamic data) async {
    try {
      String url = "$_base_url$path";

      print("token: $_token");
      Response response = await _dio.put(
        url,
        data: data,
        options: Options(headers: {'Authorization': 'Bearer $_token'}),
      );
      return response;
    } catch (e) {
      print('HTTPService: Unable to perform put request.');
      print(e);
      return null;
    }
  }

  Future<Response?> delete(String path) async {
    try {
      String url = "$_base_url$path";
      Response response = await _dio.delete(
        url,
        options: Options(headers: {'Authorization': 'Bearer $_token'}),
      );
      return response;
    } catch (e) {
      print('HTTPService: Unable to perform delete request.');
      print(e);
      return null;
    }
  }
}
