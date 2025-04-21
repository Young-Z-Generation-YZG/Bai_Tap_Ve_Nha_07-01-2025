import 'dart:async';
import 'dart:convert';
import 'package:admin_flutter/config/appConfig.dart';
import 'package:admin_flutter/domain/app-notification.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

class SocketService {
  final Dio _dio = Dio();
  AppConfig? _appConfig;
  String? _base_url;

  late IO.Socket socket;
  bool isConnected = false;

  // Stream controller for notifications, typed to AppNotification
  final StreamController<AppNotification> _notificationController =
      StreamController<AppNotification>.broadcast();

  // Getter for the stream
  Stream<AppNotification> get notificationStream =>
      _notificationController.stream;

  SocketService() {
    _appConfig = GetIt.instance.get<AppConfig>();
    _base_url = _appConfig!.API_URL;
  }

  void initializeSocket() {
    socket = IO.io(_base_url, <String, dynamic>{
      'transports': ['websocket'],
      'autoConnect': false,
    });

    socket.connect();

    socket.onConnect((_) {
      print('Connected to socket server');
      isConnected = true;

      authenticate("664439317954a1ae3c523650", "ADMIN");
      _setupAdminListeners();
    });

    socket.onDisconnect((_) {
      print('Disconnected from socket server');
    });
  }

  void authenticate(String userId, String role) {
    if (isConnected) {
      socket.emit('authenticate', {'userId': userId, 'role': role});
      print('Authenticated as $role with ID: $userId');
    } else {
      print('Cannot authenticate: Socket not connected');
    }
  }

  void _setupAdminListeners() {
    // socket.on('admin-notification', (data) {
    //   print('Admin notification received: $data');
    //   _processNotification(data);
    // });

    // socket.on('notification', (data) {
    //   print('General notification received: $data');
    //   // _processNotification(data);
    // });
  }

  AppNotification processNotification(dynamic res) {
    Map<String, dynamic> data;
    if (res is Map<String, dynamic>) {
      data = res;
    } else {
      data = jsonDecode(res.toString());
    }

    print("1. raw: $data");

    AppNotification notification = AppNotification.fromJson(data);

    print("2. AppNotification: $notification");

    return notification;
  }

  void sendMessage(String event, dynamic data) {
    if (isConnected) {
      socket.emit(event, data);
    } else {
      print('Cannot send message: Socket not connected');
    }
  }

  void dispose() {
    socket.disconnect();
    socket.dispose();
    _notificationController.close();
  }
}
