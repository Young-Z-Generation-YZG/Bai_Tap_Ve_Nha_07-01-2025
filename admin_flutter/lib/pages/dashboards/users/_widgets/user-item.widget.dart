import 'package:admin_flutter/domain/user.dart';
import 'package:admin_flutter/pages/dashboards/users/user-statistics.page.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

Widget UserItem(BuildContext context, User user) {
  return GestureDetector(
    child: Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(10),
          boxShadow: const [BoxShadow(color: Colors.black12, blurRadius: 5)],
        ),
        child: Padding(
          padding: const EdgeInsets.all(12.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Text(
                    "#${user.id}",
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF9747FF),
                    ),
                  ),
                  Spacer(),
                ],
              ),
              SizedBox(height: 12),
              _infoRow(
                'User',
                user.firstName + " " + user.lastName,
                "https://img.icons8.com/?size=100&id=skjSUPfBtF8I&format=png&color=000000",
              ),
              Divider(height: 16),
              _infoRow('Email', user.email),
              Divider(height: 16),
              _infoRow('Phone Number', user.phoneNumber),
              Divider(height: 16),
              _infoRow('Date', user.createdAt.toString()),
            ],
          ),
        ),
      ),
    ),
    onTap: () {
      Navigator.push(
        context,
        CupertinoPageRoute(
          builder: (context) => UserStatisticsPage(user: user),
        ),
      );
    },
  );
}

Widget _infoRow(String label, String value, [String? imageUrl]) {
  return Row(
    children: [
      SizedBox(
        width: 70,
        child: Text(label, style: TextStyle(color: Colors.grey, fontSize: 13)),
      ),
      if (imageUrl != null) ...[
        Container(
          width: 28,
          height: 28,
          margin: EdgeInsets.only(right: 8),
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            image: DecorationImage(
              image: NetworkImage(imageUrl),
              fit: BoxFit.cover,
            ),
          ),
        ),
      ],
      Expanded(
        child: Text(
          value,
          style: TextStyle(fontSize: 14, color: Colors.black87),
        ),
      ),
    ],
  );
}
