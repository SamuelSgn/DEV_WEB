import 'dart:convert';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'api_service.dart';
import 'home_page.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _nameController = TextEditingController();
  final _firstnameController = TextEditingController();
  
  bool _isLogin = true;
  bool _loading = false;
  String? _error;

  Future<void> _handleSubmit() async {
    setState(() {
      _loading = true;
      _error = null;
    });

    try {
      final endpoint = _isLogin ? '/login' : '/register';
      final payload = {
        'email': _emailController.text.trim(),
        'password': _passwordController.text,
      };
      
      if (!_isLogin) {
        payload['name'] = _nameController.text.trim();
        payload['firstname'] = _firstnameController.text.trim();
      }

      final res = await ApiService.post(endpoint, payload);

      if (res.statusCode == 201 || res.statusCode == 200) {
        final data = jsonDecode(res.body);
        await ApiService.saveToken(data['accessToken']);
        if (mounted) {
          Navigator.of(context).pushReplacement(
            PageRouteBuilder(
              pageBuilder: (context, animation, secondaryAnimation) => const HomePage(),
              transitionsBuilder: (context, animation, secondaryAnimation, child) {
                return FadeTransition(opacity: animation, child: child);
              },
            ),
          );
        }
      } else {
        final data = jsonDecode(res.body);
        setState(() {
          _error = data['message'] ?? 'Erreur d\'authentification';
        });
      }
    } catch (e) {
      setState(() {
        _error = 'Erreur de connexion au serveur';
      });
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Background Gradient
          Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [Color(0xFF0F172A), Color(0xFF1E1B4B), Color(0xFF312E81)],
              ),
            ),
          ),
          
          // Decorative Blobs
          Positioned(
            top: -100,
            left: -50,
            child: _buildBlob(250, Colors.indigo.withOpacity(0.15)),
          ),
          Positioned(
            bottom: -150,
            right: -50,
            child: _buildBlob(300, Colors.pink.withOpacity(0.1)),
          ),

          SafeArea(
            child: Center(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(24.0),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(30),
                  child: BackdropFilter(
                    filter: ImageFilter.blur(sigmaX: 15, sigmaY: 15),
                    child: Container(
                      padding: const EdgeInsets.all(32),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.05),
                        borderRadius: BorderRadius.circular(30),
                        border: Border.all(color: Colors.white.withOpacity(0.1), width: 1.5),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.3),
                            blurRadius: 30,
                            offset: const Offset(0, 10),
                          ),
                        ],
                      ),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          _buildHeader(),
                          const SizedBox(height: 32),
                          if (_error != null) _buildError(),
                          
                          if (!_isLogin) ...[
                            _buildInput(label: 'Prénom', controller: _firstnameController, icon: Icons.person_outline),
                            const SizedBox(height: 16),
                            _buildInput(label: 'Nom', controller: _nameController, icon: Icons.person_outline),
                            const SizedBox(height: 16),
                          ],
                          
                          _buildInput(label: 'Email', controller: _emailController, icon: Icons.mail_outline, keyboardType: TextInputType.emailAddress),
                          const SizedBox(height: 16),
                          _buildInput(label: 'Mot de passe', controller: _passwordController, icon: Icons.lock_outline, isPassword: true),
                          
                          const SizedBox(height: 32),
                          _buildSubmitButton(),
                          
                          const SizedBox(height: 24),
                          _buildToggleAuth(),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBlob(double size, Color color) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: color,
        shape: BoxShape.circle,
      ),
    );
  }

  Widget _buildHeader() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              _isLogin ? 'Connexion' : 'Inscription',
              style: const TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.bold, letterSpacing: -0.5),
            ),
            const SizedBox(height: 4),
            Text(
              _isLogin ? 'Content de vous revoir !' : 'Commencez l\'aventure.',
              style: TextStyle(color: Colors.white.withOpacity(0.5), fontSize: 14),
            ),
          ],
        ),
        Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: Colors.indigo.withOpacity(0.2),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Colors.indigo.withOpacity(0.3)),
          ),
          child: Icon(_isLogin ? Icons.login : Icons.person_add_alt_1, color: Colors.indigo[300], size: 28),
        ),
      ],
    );
  }

  Widget _buildError() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(12),
      margin: const EdgeInsets.only(bottom: 24),
      decoration: BoxDecoration(
        color: Colors.red.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.red.withOpacity(0.3)),
      ),
      child: Text(_error!, style: const TextStyle(color: Colors.redAccent, fontSize: 13), textAlign: TextAlign.center),
    );
  }

  Widget _buildInput({required String label, required TextEditingController controller, required IconData icon, bool isPassword = false, TextInputType? keyboardType}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 4, bottom: 8),
          child: Text(label.toUpperCase(), style: TextStyle(color: Colors.white.withOpacity(0.3), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.5)),
        ),
        TextField(
          controller: controller,
          obscureText: isPassword,
          keyboardType: keyboardType,
          style: const TextStyle(color: Colors.white, fontSize: 15),
          decoration: InputDecoration(
            prefixIcon: Icon(icon, color: Colors.white.withOpacity(0.3), size: 20),
            hintText: 'Entrez votre $label',
            hintStyle: TextStyle(color: Colors.white.withOpacity(0.2)),
            filled: true,
            fillColor: Colors.white.withOpacity(0.05),
            contentPadding: const EdgeInsets.symmetric(vertical: 18, horizontal: 20),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide.none),
            enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide(color: Colors.white.withOpacity(0.05))),
            focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: const BorderSide(color: Colors.indigoAccent)),
          ),
        ),
      ],
    );
  }

  Widget _buildSubmitButton() {
    return SizedBox(
      width: double.infinity,
      height: 56,
      child: ElevatedButton(
        onPressed: _loading ? null : _handleSubmit,
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.indigoAccent,
          foregroundColor: Colors.white,
          elevation: 0,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          shadowColor: Colors.indigoAccent.withOpacity(0.4),
        ),
        child: _loading
            ? const SizedBox(height: 24, width: 24, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 3))
            : Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(_isLogin ? 'Se connecter' : 'Créer un compte', style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                  const SizedBox(width: 8),
                  const Icon(Icons.arrow_forward, size: 20),
                ],
              ),
      ),
    );
  }

  Widget _buildToggleAuth() {
    return Center(
      child: GestureDetector(
        onTap: () => setState(() => _isLogin = !_isLogin),
        child: RichText(
          text: TextSpan(
            text: _isLogin ? "Pas de compte ? " : "Déjà membre ? ",
            style: TextStyle(color: Colors.white.withOpacity(0.5), fontSize: 14),
            children: [
              TextSpan(
                text: _isLogin ? "Inscrivez-vous" : "Connectez-vous",
                style: const TextStyle(color: Colors.indigoAccent, fontWeight: FontWeight.bold),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
