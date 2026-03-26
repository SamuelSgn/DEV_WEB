import 'dart:convert';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'api_service.dart';
import 'models/todo.dart';
import 'models/note.dart';
import 'login_page.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _currentIndex = 0;
  List<Todo> _todos = [];
  List<Note> _notes = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _fetchData();
  }

  Future<void> _fetchData() async {
    if (mounted) setState(() => _loading = true);
    try {
      if (_currentIndex == 0) {
        final res = await ApiService.get('/todos');
        if (res.statusCode == 200) {
          final List data = jsonDecode(res.body);
          if (mounted) setState(() => _todos = data.map((e) => Todo.fromJson(e)).toList());
        }
      } else {
        final res = await ApiService.get('/notes');
        if (res.statusCode == 200) {
          final List data = jsonDecode(res.body);
          if (mounted) setState(() => _notes = data.map((e) => Note.fromJson(e)).toList());
        }
      }
    } catch (e) {
      debugPrint('Fetch Error: $e');
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  void _logout() async {
    await ApiService.logout();
    if (mounted) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (_) => const LoginPage()),
      );
    }
  }

  void _showInfoDialog(String title, String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF1E1B4B),
        title: Text(title, style: const TextStyle(color: Colors.white)),
        content: Text(message, style: const TextStyle(color: Colors.white70)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Fermer', style: TextStyle(color: Colors.indigoAccent)),
          ),
        ],
      ),
    );
  }

  void _showAddDialog() {
    final isTodo = _currentIndex == 0;
    final titleCtrl = TextEditingController();
    final contentCtrl = TextEditingController();
    
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => Padding(
        padding: EdgeInsets.only(bottom: MediaQuery.of(context).viewInsets.bottom),
        child: ClipRRect(
          borderRadius: const BorderRadius.vertical(top: Radius.circular(30)),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
            child: Container(
              padding: const EdgeInsets.all(32),
              decoration: BoxDecoration(
                color: const Color(0xFF1E1B4B).withOpacity(0.9),
                border: Border.all(color: Colors.white.withOpacity(0.1)),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    isTodo ? 'Nouvelle Tâche' : 'Nouvelle Note',
                    style: const TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 24),
                  _buildDialogField('Titre', titleCtrl),
                  const SizedBox(height: 16),
                  _buildDialogField(isTodo ? 'Description' : 'Contenu', contentCtrl, maxLines: isTodo ? 1 : 4),
                  const SizedBox(height: 32),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.indigoAccent,
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      ),
                      onPressed: () async {
                        final payload = isTodo 
                          ? {'title': titleCtrl.text, 'description': contentCtrl.text, 'dueTime': DateTime.now().add(const Duration(days: 1)).toIso8601String()}
                          : {'title': titleCtrl.text, 'content': contentCtrl.text};
                        
                        await ApiService.post(isTodo ? '/todos' : '/notes', payload);
                        if (mounted) Navigator.pop(context);
                        _fetchData();
                      },
                      child: Text(isTodo ? 'Ajouter' : 'Enregistrer', style: const TextStyle(fontWeight: FontWeight.bold)),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildDialogField(String label, TextEditingController controller, {int maxLines = 1}) {
    return TextField(
      controller: controller,
      maxLines: maxLines,
      style: const TextStyle(color: Colors.white),
      decoration: InputDecoration(
        labelText: label,
        labelStyle: TextStyle(color: Colors.white.withOpacity(0.4)),
        filled: true,
        fillColor: Colors.white.withOpacity(0.05),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBody: true,
      backgroundColor: const Color(0xFF0F172A),
      drawer: Drawer(
        backgroundColor: const Color(0xFF1E1B4B),
        child: Column(
          children: [
            DrawerHeader(
              decoration: BoxDecoration(color: Colors.indigoAccent.withOpacity(0.1)),
              child: const Center(child: Text('SkyFlow', style: TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.bold))),
            ),
            ListTile(
              leading: const Icon(Icons.info_outline, color: Colors.indigoAccent),
              title: const Text('À propos', style: TextStyle(color: Colors.white)),
              onTap: () {
                Navigator.pop(context);
                _showInfoDialog('À propos', 'SkyFlow est une solution moderne de productivité utilisant le design glassmorphism.');
              },
            ),
            ListTile(
              leading: const Icon(Icons.mail_outline, color: Colors.indigoAccent),
              title: const Text('Contact', style: TextStyle(color: Colors.white)),
              onTap: () {
                Navigator.pop(context);
                _showInfoDialog('Contact', 'Une question ? Contactez-nous à hello@skyflow.app');
              },
            ),
          ],
        ),
      ),
      body: Stack(
        children: [
          // Background Blobs
          Positioned(top: -100, right: -50, child: Container(width: 300, height: 300, decoration: BoxDecoration(color: Colors.indigo.withOpacity(0.1), shape: BoxShape.circle))),
          Positioned(bottom: 100, left: -50, child: Container(width: 250, height: 250, decoration: BoxDecoration(color: Colors.pink.withOpacity(0.05), shape: BoxShape.circle))),

          SafeArea(
            child: Column(
              children: [
                _buildAppBar(),
                Expanded(
                  child: _loading 
                    ? const Center(child: CircularProgressIndicator(color: Colors.indigoAccent))
                    : _buildContent(),
                ),
              ],
            ),
          ),
        ],
      ),
      bottomNavigationBar: _buildBottomNav(),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.indigoAccent,
        onPressed: _showAddDialog,
        child: const Icon(Icons.add, color: Colors.white, size: 30),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
    );
  }

  Widget _buildAppBar() {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          const Text('SkyFlow', style: TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.w900, letterSpacing: -1)),
          IconButton(
            onPressed: _logout,
            icon: Icon(Icons.logout_rounded, color: Colors.white.withOpacity(0.4), size: 28),
          ),
        ],
      ),
    );
  }

  Widget _buildContent() {
    if (_currentIndex == 0) {
      return _todos.isEmpty ? _buildEmpty('Aucune tâche') : ListView.builder(
        padding: const EdgeInsets.symmetric(horizontal: 24),
        itemCount: _todos.length,
        itemBuilder: (_, i) => _buildTodoCard(_todos[i]),
      );
    } else {
      return _notes.isEmpty ? _buildEmpty('Aucune note') : GridView.builder(
        padding: const EdgeInsets.symmetric(horizontal: 24),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2, crossAxisSpacing: 16, mainAxisSpacing: 16),
        itemCount: _notes.length,
        itemBuilder: (_, i) => _buildNoteCard(_notes[i]),
      );
    }
  }

  Widget _buildEmpty(String title) {
    return Center(
      child: Opacity(
        opacity: 0.3,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.auto_awesome, size: 80, color: Colors.white),
            const SizedBox(height: 16),
            Text(title, style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }

  Widget _buildTodoCard(Todo todo) {
    final done = todo.status == 'completed';
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.03),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white.withOpacity(0.05)),
      ),
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        leading: GestureDetector(
          onTap: () async {
            final newStatus = done ? 'pending' : 'completed';
            await ApiService.put('/todos/${todo.id}', {'status': newStatus});
            _fetchData();
          },
          child: Icon(done ? Icons.check_circle : Icons.circle_outlined, color: done ? Colors.indigoAccent : Colors.white.withOpacity(0.2), size: 30),
        ),
        title: Text(todo.title, style: TextStyle(color: done ? Colors.white.withOpacity(0.3) : Colors.white, fontWeight: FontWeight.bold, decoration: done ? TextDecoration.lineThrough : null)),
        subtitle: Text(todo.description, style: TextStyle(color: Colors.white.withOpacity(0.4), fontSize: 12)),
        trailing: IconButton(icon: const Icon(Icons.delete_outline, color: Colors.redAccent, size: 24), onPressed: () async {
          await ApiService.delete('/todos/${todo.id}');
          _fetchData();
        }),
      ),
    );
  }

  Widget _buildNoteCard(Note note) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.03),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white.withOpacity(0.05)),
      ),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(child: Text(note.title, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16), maxLines: 1)),
              IconButton(padding: EdgeInsets.zero, constraints: const BoxConstraints(), icon: const Icon(Icons.delete_outline, color: Colors.redAccent, size: 18), onPressed: () async {
                await ApiService.delete('/notes/${note.id}');
                _fetchData();
              }),
            ],
          ),
          const SizedBox(height: 8),
          Expanded(child: Text(note.content, style: TextStyle(color: Colors.white.withOpacity(0.5), fontSize: 13), overflow: TextOverflow.fade)),
        ],
      ),
    );
  }

  Widget _buildBottomNav() {
    return Container(
      margin: const EdgeInsets.fromLTRB(24, 0, 24, 24),
      decoration: BoxDecoration(
        color: const Color(0xFF1E1B4B).withOpacity(0.8),
        borderRadius: BorderRadius.circular(30),
        border: Border.all(color: Colors.white.withOpacity(0.1)),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(30),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
          child: BottomNavigationBar(
            elevation: 0,
            backgroundColor: Colors.transparent,
            currentIndex: _currentIndex,
            onTap: (i) => setState(() { _currentIndex = i; _fetchData(); }),
            selectedItemColor: Colors.indigoAccent,
            unselectedItemColor: Colors.white.withOpacity(0.3),
            showSelectedLabels: false,
            showUnselectedLabels: false,
            type: BottomNavigationBarType.fixed,
            items: const [
              BottomNavigationBarItem(icon: Icon(Icons.dashboard_rounded), label: 'Tasks'),
              BottomNavigationBarItem(icon: Icon(Icons.sticky_note_2_rounded), label: 'Notes'),
            ],
          ),
        ),
      ),
    );
  }
}
