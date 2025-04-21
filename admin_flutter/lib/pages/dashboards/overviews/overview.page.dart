import 'package:admin_flutter/widgets/card-wrapper.widget.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';

class OverviewPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return OverviewPageState();
  }
}

class OverviewPageState extends State<OverviewPage> {
  double? _deviceWidth, _deviceHeight;

  // Define the primary color as a constant
  final Color primaryColor = Color(0xFF9747FF);

  @override
  Widget build(BuildContext context) {
    _deviceWidth = MediaQuery.of(context).size.width;
    _deviceHeight = MediaQuery.of(context).size.height;

    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: Text('Overview'), // Title
        backgroundColor: Color(0xFFf6f6f6), // Match your app's theme
        border: null, // Remove bottom border if you want
        leading: CupertinoNavigationBarBackButton(
          color: primaryColor,
          previousPageTitle: 'Home', // This will show "Home" in the back button
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      backgroundColor: Color(0xFFf6f6f6), // Match your app's background
      child: SafeArea(
        child: SingleChildScrollView(
          physics: BouncingScrollPhysics(),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  _businessIndexCard("Views", isUp: true),
                  _businessIndexCard("Visits", isUp: false),
                ],
              ),
              SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  _businessIndexCard("New Users", isUp: false),
                  _businessIndexCard("Active Users", isUp: true),
                ],
              ),
              SizedBox(height: 16),
              _revenueChartCard(),
              SizedBox(height: 16),
              _userActivityChart(),
              SizedBox(height: 16),
              _pieChartCard(),
            ],
          ),
        ),
      ),
    );
  }

  _businessIndexCard(String text, {bool isUp = true}) {
    return CardWrapper(
      width: _deviceWidth! * 0.45,
      height: _deviceHeight! * 0.13,
      backgroundColor: isUp ? primaryColor : Color(0xFF0d0d0d),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  text,
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w500,
                    color: Colors.white,
                  ),
                ),
                Icon(
                  isUp ? Icons.trending_up : Icons.trending_down,
                  color: Colors.white,
                ),
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "7,265",
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                  ),
                ),
                Text(
                  isUp ? "+11.01%" : "-11.01%",
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: Colors.white,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  _revenueChartCard() {
    // Calculate total revenue from the data
    final List<double> monthlyRevenue = [
      2500,
      1500,
      3000,
      4000,
      3000,
      3500,
      4200,
      3800,
      4500,
      5000,
      4800,
      5200,
    ];
    final double totalRevenue = monthlyRevenue.reduce((a, b) => a + b);

    return CardWrapper(
      width: _deviceWidth! * 0.9,
      height: _deviceHeight! * 0.35,
      backgroundColor: Colors.white,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _tabButton("Revenues", isSelected: true),
                Text(
                  "Total: \$${totalRevenue.toStringAsFixed(0)}",
                  style: TextStyle(
                    color: primaryColor,
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
            SizedBox(height: 20),
            Expanded(
              child: LineChart(
                LineChartData(
                  minX: 0,
                  maxX: 11,
                  minY: 0,
                  maxY: 6000,
                  gridData: FlGridData(show: false),
                  titlesData: FlTitlesData(
                    rightTitles: const AxisTitles(
                      sideTitles: SideTitles(showTitles: false),
                    ),
                    topTitles: const AxisTitles(
                      sideTitles: SideTitles(showTitles: false),
                    ),
                    leftTitles: AxisTitles(
                      sideTitles: SideTitles(
                        showTitles: true,
                        reservedSize: 50,
                        interval: 1500,
                        getTitlesWidget: (value, meta) {
                          return Text(
                            '\$${value.toInt()}',
                            style: const TextStyle(
                              color: Colors.grey,
                              fontSize: 12,
                            ),
                          );
                        },
                      ),
                    ),
                    bottomTitles: AxisTitles(
                      sideTitles: SideTitles(
                        showTitles: true,
                        reservedSize: 22,
                        interval: 1,
                        getTitlesWidget: (value, meta) {
                          const months = [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec',
                          ];
                          final int index = value.toInt();
                          if (index < 0 || index >= months.length) {
                            return const Text('');
                          }
                          return Text(
                            months[index],
                            style: const TextStyle(
                              color: Colors.grey,
                              fontSize: 12,
                            ),
                          );
                        },
                      ),
                    ),
                  ),
                  borderData: FlBorderData(show: false),
                  lineBarsData: [
                    LineChartBarData(
                      spots: [
                        FlSpot(0, monthlyRevenue[0]),
                        FlSpot(1, monthlyRevenue[1]),
                        FlSpot(2, monthlyRevenue[2]),
                        FlSpot(3, monthlyRevenue[3]),
                        FlSpot(4, monthlyRevenue[4]),
                        FlSpot(5, monthlyRevenue[5]),
                        FlSpot(6, monthlyRevenue[6]),
                        FlSpot(7, monthlyRevenue[7]),
                        FlSpot(8, monthlyRevenue[8]),
                        FlSpot(9, monthlyRevenue[9]),
                        FlSpot(10, monthlyRevenue[10]),
                        FlSpot(11, monthlyRevenue[11]),
                      ],
                      isCurved: true,
                      color: primaryColor.withOpacity(0.8),
                      barWidth: 2,
                      isStrokeCapRound: true,
                      dotData: FlDotData(
                        show: true,
                        getDotPainter: (spot, percent, barData, index) {
                          return FlDotCirclePainter(
                            radius: 4,
                            color: Colors.white,
                            strokeWidth: 2,
                            strokeColor: primaryColor,
                          );
                        },
                      ),
                      belowBarData: BarAreaData(
                        show: true,
                        color: primaryColor.withAlpha(30),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  _userActivityChart() {
    // Sample data for daily active users over the past week
    final List<Map<String, dynamic>> userActivityData = [
      {'day': 'Mon', 'users': 1250, 'color': primaryColor},
      {'day': 'Tue', 'users': 1430, 'color': primaryColor},
      {'day': 'Wed', 'users': 1700, 'color': primaryColor},
      {'day': 'Thu', 'users': 1390, 'color': primaryColor},
      {'day': 'Fri', 'users': 1850, 'color': primaryColor},
      {'day': 'Sat', 'users': 1260, 'color': primaryColor},
      {'day': 'Sun', 'users': 1100, 'color': primaryColor},
    ];

    // Calculate week average
    final double averageUsers =
        userActivityData
            .map((data) => data['users'] as int)
            .reduce((a, b) => a + b) /
        userActivityData.length;

    // Find the day with maximum users
    final Map<String, dynamic> maxDay = userActivityData.reduce(
      (a, b) => a['users'] > b['users'] ? a : b,
    );

    return CardWrapper(
      width: _deviceWidth! * 0.9,
      height: _deviceHeight! * 0.35,
      backgroundColor: Colors.white,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Daily Active Users',
                  style: TextStyle(
                    color: Color(0xFF9747FF),
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                Text(
                  "Avg: ${averageUsers.toStringAsFixed(0)}",
                  style: TextStyle(
                    color: primaryColor,
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
            SizedBox(height: 8),
            // User insights
            Text(
              'Peak day: ${maxDay['day']} with ${maxDay['users']} active users',
              style: TextStyle(
                color: Colors.grey[700],
                fontSize: 14,
                fontWeight: FontWeight.w500,
              ),
            ),
            SizedBox(height: 20),
            Expanded(
              child: BarChart(
                BarChartData(
                  alignment: BarChartAlignment.spaceAround,
                  maxY: 2000,
                  barTouchData: BarTouchData(
                    enabled: true,
                    touchTooltipData: BarTouchTooltipData(
                      getTooltipItem: (group, groupIndex, rod, rodIndex) {
                        return BarTooltipItem(
                          '${userActivityData[groupIndex]['day']}: ${rod.toY.round()}',
                          TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        );
                      },
                    ),
                  ),
                  titlesData: FlTitlesData(
                    show: true,
                    bottomTitles: AxisTitles(
                      sideTitles: SideTitles(
                        showTitles: true,
                        getTitlesWidget: (value, meta) {
                          final index = value.toInt();
                          if (index < 0 || index >= userActivityData.length) {
                            return const Text('');
                          }
                          return Text(
                            userActivityData[index]['day'] as String,
                            style: TextStyle(
                              color: Colors.grey[700],
                              fontWeight: FontWeight.bold,
                              fontSize: 12,
                            ),
                          );
                        },
                        reservedSize: 28,
                      ),
                    ),
                    leftTitles: AxisTitles(
                      sideTitles: SideTitles(
                        showTitles: true,
                        reservedSize: 40,
                        interval: 500,
                        getTitlesWidget: (value, meta) {
                          return Text(
                            value.toInt().toString(),
                            style: TextStyle(
                              color: Colors.grey[700],
                              fontWeight: FontWeight.bold,
                              fontSize: 12,
                            ),
                          );
                        },
                      ),
                    ),
                    topTitles: const AxisTitles(
                      sideTitles: SideTitles(showTitles: false),
                    ),
                    rightTitles: const AxisTitles(
                      sideTitles: SideTitles(showTitles: false),
                    ),
                  ),
                  borderData: FlBorderData(show: false),
                  gridData: FlGridData(
                    show: true,
                    drawHorizontalLine: true,
                    drawVerticalLine: false,
                    horizontalInterval: 500,
                    getDrawingHorizontalLine: (value) {
                      return FlLine(
                        color: Colors.grey[300],
                        strokeWidth: 1,
                        dashArray: [5],
                      );
                    },
                  ),
                  barGroups:
                      userActivityData.asMap().entries.map((entry) {
                        final index = entry.key;
                        final data = entry.value;
                        return BarChartGroupData(
                          x: index,
                          barRods: [
                            BarChartRodData(
                              toY: data['users'].toDouble(),
                              color: primaryColor,
                              width: 18,
                              borderRadius: BorderRadius.vertical(
                                top: Radius.circular(6),
                              ),
                              backDrawRodData: BackgroundBarChartRodData(
                                show: true,
                                toY: 2000,
                                color: Colors.grey[200],
                              ),
                            ),
                          ],
                        );
                      }).toList(),
                ),
                swapAnimationDuration: Duration(milliseconds: 800),
                swapAnimationCurve: Curves.easeInOutQuart,
              ),
            ),
          ],
        ),
      ),
    );
  }

  _pieChartCard() {
    // Define more appealing colors
    final Color preparingColor = Color(0xFF5C6BC0); // Indigo
    final Color deliveringColor = Color(0xFF66BB6A); // Green
    final Color deliveredColor = Color(0xFFFF9800); // Orange

    return CardWrapper(
      width: _deviceWidth! * 0.9,
      height: _deviceHeight! * 0.3,
      backgroundColor: Colors.white,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Orders Status',
              style: TextStyle(
                color: Color(0xFF9747FF),
                fontSize: 20,
                fontWeight: FontWeight.w600,
              ),
            ),
            SizedBox(height: 18),
            Expanded(
              child: Row(
                children: [
                  // Pie Chart
                  Expanded(
                    flex: 5,
                    child: Stack(
                      alignment: Alignment.center,
                      children: [
                        AspectRatio(
                          aspectRatio: 1,
                          child: PieChart(
                            PieChartData(
                              sectionsSpace: 2,
                              centerSpaceRadius: 40,
                              borderData: FlBorderData(show: false),
                              startDegreeOffset: -90,
                              sections: [
                                PieChartSectionData(
                                  value: 67.6,
                                  color: preparingColor,
                                  title: '67.6%',
                                  radius: 50,
                                  titleStyle: TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white,
                                  ),
                                  titlePositionPercentageOffset: 0.6,
                                ),
                                PieChartSectionData(
                                  value: 26.4,
                                  color: deliveringColor,
                                  title: '26.4%',
                                  radius: 55,
                                  titleStyle: TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white,
                                  ),
                                  titlePositionPercentageOffset: 0.6,
                                ),
                                PieChartSectionData(
                                  value: 6,
                                  color: deliveredColor,
                                  title: '6%',
                                  radius: 60,
                                  titleStyle: TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white,
                                  ),
                                  titlePositionPercentageOffset: 0.6,
                                ),
                              ],
                            ),
                            swapAnimationDuration: Duration(milliseconds: 800),
                            swapAnimationCurve: Curves.easeInOutQuint,
                          ),
                        ),
                        // Center circle with shadow
                        Container(
                          width: 65,
                          height: 65,
                          decoration: BoxDecoration(
                            color: Colors.white,
                            shape: BoxShape.circle,
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.05),
                                spreadRadius: 2,
                                blurRadius: 5,
                                offset: Offset(0, 2),
                              ),
                            ],
                          ),
                          child: Center(
                            child: Text(
                              'Orders',
                              style: TextStyle(
                                color: Color(0xFF9747FF),
                                fontWeight: FontWeight.w600,
                                fontSize: 12,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(width: 20),
                  // Legend
                  Expanded(
                    flex: 4,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _legendItem('Preparing', '67.6%', preparingColor),
                        SizedBox(height: 16),
                        _legendItem('Delivering', '26.4%', deliveringColor),
                        SizedBox(height: 16),
                        _legendItem('Delivered', '6%', deliveredColor),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _legendItem(String label, String percentage, Color color) {
    return Row(
      children: [
        Container(
          width: 10,
          height: 10,
          decoration: BoxDecoration(
            color: color,
            shape: BoxShape.circle,
            boxShadow: [
              BoxShadow(
                color: color.withOpacity(0.4),
                spreadRadius: 1,
                blurRadius: 2,
                offset: Offset(0, 1),
              ),
            ],
          ),
        ),
        SizedBox(width: 10),
        Text(
          label,
          style: TextStyle(
            color: Colors.black87,
            fontSize: 14,
            fontWeight: FontWeight.w500,
          ),
        ),
        Spacer(),
        Text(
          percentage,
          style: TextStyle(
            color: color.withOpacity(0.9),
            fontSize: 14,
            fontWeight: FontWeight.w700,
          ),
        ),
      ],
    );
  }

  _tabButton(String text, {required bool isSelected}) {
    return Text(
      text,
      style: TextStyle(
        color: isSelected ? Color(0xFF9747FF) : Colors.grey,
        fontSize: 16,
        fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
      ),
    );
  }
}
