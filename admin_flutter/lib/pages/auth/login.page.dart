import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<StatefulWidget> createState() {
    return LoginPageState();
  }
}

class LoginPageState extends State<LoginPage> {
  double? _deviceWidth, _deviceHeight;
  final TextEditingController _emailOrPhoneController = TextEditingController();

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
                        color: Colors.white.withOpacity(0.3),
                        thickness: 1,
                      ),
                    ),
                    SizedBox(height: 30),

                    // Email/Phone input
                    Container(
                      height: 50,
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.2),
                        borderRadius: BorderRadius.circular(25),
                      ),
                      child: CupertinoTextField(
                        controller: _emailOrPhoneController,
                        placeholder: 'Email or Phone number',
                        placeholderStyle: TextStyle(
                          color: Colors.white.withOpacity(0.7),
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
                        // Handle sign in/sign up
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
                            'Sign In or Sign up',
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

  @override
  void dispose() {
    _emailOrPhoneController.dispose();
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
