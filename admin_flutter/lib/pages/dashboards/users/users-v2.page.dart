import 'dart:convert';

import 'package:admin_flutter/domain/user.dart';
import 'package:admin_flutter/pages/dashboards/users/_widgets/user-item.widget.dart';
import 'package:admin_flutter/services/http.service.dart';
import 'package:flutter/cupertino.dart';
import 'package:get_it/get_it.dart';

class UsersPageV2 extends StatefulWidget {
  const UsersPageV2({super.key});

  @override
  State<StatefulWidget> createState() {
    return UserPageState();
  }
}

class UserPageState extends State<UsersPageV2> {
  late HttpService? _http;

  double? _deviceWidth, _deviceHeight;

  final TextEditingController _searchController = TextEditingController();

  late List<User> _users = [];

  @override
  void initState() {
    super.initState();

    _http = GetIt.instance.get<HttpService>();

    _fetchUsers();
  }

  @override
  Widget build(BuildContext context) {
    _deviceWidth = MediaQuery.of(context).size.width;
    _deviceHeight = MediaQuery.of(context).size.height;

    return Container(
      color: Color(0xFFf6f6f6),
      child: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: EdgeInsets.only(
                left: 16.0,
                right: 16.0,
                top: 8.0,
                bottom: 16.0,
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Users',
                    style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
                  ),
                  CupertinoButton(
                    padding: EdgeInsets.zero,
                    child: Icon(
                      CupertinoIcons.ellipsis,
                      color: CupertinoColors.systemBlue,
                    ),
                    onPressed: () => {},
                  ),
                ],
              ),
            ),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.0),
              child: CupertinoSearchTextField(
                controller: _searchController,
                placeholder: 'Search user...',
                onChanged: (value) {},
              ),
            ),
            SizedBox(height: 16),
            Expanded(child: _userList()),
          ],
        ),
      ),
    );
  }

  Widget _userList() {
    return ListView.builder(
      padding: EdgeInsets.only(left: 16.0, right: 16.0, bottom: 80.0),
      itemCount: _users.length,
      itemBuilder: (context, index) {
        return UserItem(context, _users[index]);
      },
    );
  }

  void _fetchUsers() async {
    final response = await _http?.get("/api/v1/users/admin");

    if (response != null) {
      Map<String, dynamic> data = jsonDecode(response.toString());

      // Check if the data has the expected structure
      if (data.containsKey('data') &&
          data['data'] is Map &&
          data['data'].containsKey('items')) {
        List<dynamic> usersData = data['data']['items'];

        setState(() {
          _users = usersData.map((item) => User.fromJson(item)).toList();
        });
      }
    }
  }
}
