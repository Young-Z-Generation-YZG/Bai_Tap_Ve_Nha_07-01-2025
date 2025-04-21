import 'dart:convert';

import 'package:admin_flutter/main.page.dart';
import 'package:admin_flutter/services/http.service.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<StatefulWidget> createState() {
    return LoginPageState();
  }
}

class LoginPageState extends State<LoginPage> {
  double? _deviceWidth, _deviceHeight;

  late HttpService? _http;

  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  @override
  void initState() {
    super.initState();

    _http = GetIt.instance.get<HttpService>();
  }

  @override
  Widget build(BuildContext context) {
    _deviceWidth = MediaQuery.of(context).size.width;
    _deviceHeight = MediaQuery.of(context).size.height;

    return CupertinoPageScaffold(
      backgroundColor: Colors.transparent,
      child: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color(0xFF0A0A29), // Dark blue at top
              Color(0xFF3D3DBF), // Medium blue in middle
              Color(0xFF4040CE), // Lighter blue at bottom
            ],
          ),
        ),
        child: SafeArea(
          child: Stack(
            children: [
              // Background decorative elements (wavy patterns)
              Positioned(
                top: _deviceHeight! * 0.05,
                left: -50,
                child: _buildWavyDecoration(true),
              ),
              Positioned(
                right: -50,
                bottom: _deviceHeight! * 0.3,
                child: _buildWavyDecoration(false),
              ),

              // Main content
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 30),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    SizedBox(height: _deviceHeight! * 0.15),

                    // Logo
                    Center(
                      child: Container(
                        width: 80,
                        height: 80,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          shape: BoxShape.circle,
                        ),
                        child: Center(child: _buildAppLogo()),
                      ),
                    ),
                    SizedBox(height: 10),

                    // App name
                    Text(
                      'Administrator',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 24,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    SizedBox(height: _deviceHeight! * 0.15),

                    SizedBox(height: 30),

                    // Divider
                    Padding(
                      padding: EdgeInsets.symmetric(horizontal: 20),
                      child: Divider(
                        color: Colors.white.withAlpha(30),
                        thickness: 1,
                      ),
                    ),
                    SizedBox(height: 30),

                    // Email input
                    Container(
                      height: 50,
                      decoration: BoxDecoration(
                        color: Colors.white.withAlpha(20),
                        borderRadius: BorderRadius.circular(25),
                      ),
                      child: CupertinoTextField(
                        controller: _emailController,
                        placeholder: 'Email or Phone number',
                        placeholderStyle: TextStyle(
                          color: Colors.white.withAlpha(70),
                          fontSize: 16,
                        ),
                        padding: EdgeInsets.symmetric(horizontal: 20),
                        decoration: BoxDecoration(
                          color: Colors.transparent,
                          borderRadius: BorderRadius.circular(25),
                        ),
                        style: TextStyle(color: Colors.white),
                        cursorColor: Colors.white,
                      ),
                    ),
                    SizedBox(height: 20),

                    Container(
                      height: 50,
                      decoration: BoxDecoration(
                        color: Colors.white.withAlpha(20),
                        borderRadius: BorderRadius.circular(25),
                      ),
                      child: CupertinoTextField(
                        controller: _passwordController,
                        placeholder: 'Password',
                        obscureText: true,
                        placeholderStyle: TextStyle(
                          color: Colors.white.withAlpha(70),
                          fontSize: 16,
                        ),
                        padding: EdgeInsets.symmetric(horizontal: 20),
                        decoration: BoxDecoration(
                          color: Colors.transparent,
                          borderRadius: BorderRadius.circular(25),
                        ),
                        style: TextStyle(color: Colors.white),
                        cursorColor: Colors.white,
                      ),
                    ),
                    SizedBox(height: 20),

                    // Sign in button
                    CupertinoButton(
                      padding: EdgeInsets.zero,
                      onPressed: () {
                        _handleLogin(
                          _emailController.text,
                          _passwordController.text,
                        );
                      },
                      child: Container(
                        height: 50,
                        width: double.infinity,
                        decoration: BoxDecoration(
                          color: Colors.black,
                          borderRadius: BorderRadius.circular(25),
                        ),
                        child: Center(
                          child: Text(
                            'Sign In',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 16,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ),
                      ),
                    ),
                    SizedBox(height: 20),

                    // Footer links
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        CupertinoButton(
                          padding: EdgeInsets.zero,
                          child: Text(
                            'Forgot Password',
                            style: TextStyle(color: Colors.white, fontSize: 14),
                          ),
                          onPressed: () {},
                        ),
                        SizedBox(width: 20),
                        CupertinoButton(
                          padding: EdgeInsets.zero,
                          child: Text(
                            'Contact Us',
                            style: TextStyle(color: Colors.white, fontSize: 14),
                          ),
                          onPressed: () {},
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSocialButton(
    String text,
    Color color,
    VoidCallback onPressed, {
    IconData? icon,
    Color iconColor = Colors.white,
  }) {
    return CupertinoButton(
      padding: EdgeInsets.zero,
      onPressed: onPressed,
      child: Container(
        width: 70,
        height: 50,
        decoration: BoxDecoration(
          color: color,
          borderRadius: BorderRadius.circular(25),
        ),
        child: Center(
          child:
              icon != null
                  ? Icon(icon, color: iconColor, size: 24)
                  : Text(
                    text,
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
        ),
      ),
    );
  }

  Widget _buildWavyDecoration(bool isLeft) {
    return Transform.rotate(
      angle: isLeft ? 0.5 : -0.5,
      child: Container(
        width: 200,
        height: 300,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFF40CAFF), Color(0xFFA25BF7)],
          ),
          borderRadius: BorderRadius.circular(100),
        ),
      ),
    );
  }

  Widget _buildAppLogo() {
    // Simple representation of the knot-like logo
    return Container(
      width: 40,
      height: 40,
      child: CustomPaint(painter: LogoPainter()),
    );
  }

  void _handleLogin(String email, String password) async {
    final response = await _http!.post("/api/v1/auth/login", {
      "email": email,
      "password": password,
    });

    print(response);

    // Check if the widget is still mounted before using context
    if (!mounted) return;

    if (response != null) {
      Map<String, dynamic> data = jsonDecode(response.toString());

      if (data.containsKey("data") && data["data"] is Map) {
        String token = data["data"]["access_token"];

        _http!.setToken(token);

        Navigator.of(
          context,
        ).pushReplacement(CupertinoPageRoute(builder: (_) => const MainPage()));
      }

      // Handle successful login
    } else {
      // Handle login error
      showCupertinoDialog(
        context: context,
        builder:
            (context) => CupertinoAlertDialog(
              title: Text('Login Failed'),
              content: Text('Invalid email or password.'),
              actions: [
                CupertinoDialogAction(
                  child: Text('OK'),
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
      );
    }
  }

  @override
  void dispose() {
    _emailController.dispose();
    super.dispose();
  }
}

// Simple custom painter for the logo
class LogoPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final Paint paint =
        Paint()
          ..color = Colors.black
          ..style = PaintingStyle.stroke
          ..strokeWidth = 2.5;

    final path = Path();

    // Draw a simple representation of the knot logo
    final center = Offset(size.width / 2, size.height / 2);
    final radius = size.width / 3;

    // Draw overlapping circles to simulate the knot pattern
    canvas.drawCircle(
      Offset(center.dx - radius / 2, center.dy - radius / 2),
      radius,
      paint,
    );
    canvas.drawCircle(
      Offset(center.dx + radius / 2, center.dy - radius / 2),
      radius,
      paint,
    );
    canvas.drawCircle(Offset(center.dx, center.dy + radius / 2), radius, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
