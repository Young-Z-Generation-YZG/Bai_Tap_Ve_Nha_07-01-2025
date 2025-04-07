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
          color: CupertinoColors.activeBlue,
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
      backgroundColor: isUp ? Color(0xFF3394ff) : Color(0xFF0d0d0d),
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
    return CardWrapper(
      width: _deviceWidth! * 0.9,
      height: _deviceHeight! * 0.3,
      backgroundColor: Colors.white,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(children: [_tabButton("Revenues", isSelected: true)]),
            SizedBox(height: 20),
            Expanded(
              child: LineChart(
                LineChartData(
                  minX: 0,
                  maxX: 5,
                  minY: 0,
                  maxY: 5000,
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
                        interval: 1000,
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
                        FlSpot(0, 2500),
                        FlSpot(1, 1500),
                        FlSpot(2, 3000),
                        FlSpot(3, 4000),
                        FlSpot(4, 3000),
                        FlSpot(5, 3500),
                      ],
                      isCurved: true,
                      color: Color.fromARGB(255, 184, 141, 243),
                      barWidth: 2,
                      isStrokeCapRound: true,
                      dotData: FlDotData(
                        show: true,
                        getDotPainter: (spot, percent, barData, index) {
                          return FlDotCirclePainter(
                            radius: 4,
                            color: Colors.white,
                            strokeWidth: 2,
                            strokeColor: Color(0xFF9747FF),
                          );
                        },
                      ),
                      belowBarData: BarAreaData(
                        show: true,
                        color: Color(0xFF9747FF).withAlpha(30),
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

  _pieChartCard() {
    return CardWrapper(
      width: _deviceWidth! * 0.9,
      height: _deviceHeight! * 0.25,
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
            Row(
              children: [
                // Pie Chart
                SizedBox(
                  width: _deviceWidth! * 0.4,
                  height: _deviceHeight! * 0.15,
                  child: PieChart(
                    PieChartData(
                      sectionsSpace: 0,
                      centerSpaceRadius: 40,
                      sections: [
                        PieChartSectionData(
                          value: 67.6,
                          color: Color.fromARGB(255, 83, 82, 82),
                          title: '',
                          radius: 20,
                        ),
                        PieChartSectionData(
                          value: 26.4,
                          color: Color(0xFF47cc68),
                          title: '',
                          radius: 20,
                        ),
                        PieChartSectionData(
                          value: 6,
                          color: Color(0xFF9747FF),
                          title: '',
                          radius: 20,
                        ),
                      ],
                    ),
                  ),
                ),
                SizedBox(width: 20),
                // Legend
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _legendItem('Preparing', '67.6%', Color(0xFF393939)),
                      SizedBox(height: 12),
                      _legendItem('Delivering', '26.4%', Color(0xFF4CD964)),
                      SizedBox(height: 12),
                      _legendItem('Delivered', '6%', Color(0xFF6c6adb)),
                    ],
                  ),
                ),
              ],
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
          width: 8,
          height: 8,
          decoration: BoxDecoration(color: color, shape: BoxShape.circle),
        ),
        SizedBox(width: 8),
        Text(label, style: TextStyle(color: Colors.black87, fontSize: 14)),
        Spacer(),
        Text(
          percentage,
          style: TextStyle(
            color: Colors.black87,
            fontSize: 14,
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }
}
