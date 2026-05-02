from datetime import timedelta
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import check_password_hash

from api.models import User  # ✅ IMPORT CORRECTO

api = Blueprint('api', __name__)


# 🟢 REGISTER
@api.route('/register', methods=['POST'])
def register():
    name = request.json.get('name', "")
    email = request.json.get('email')
    password = request.json.get('password')
    active = request.json.get('active', True)

    if not email:
        return jsonify({"msg": "El email es obligatorio"}), 400
    if not password:
        return jsonify({"msg": "La contraseña es obligatoria"}), 400

    email = email.lower().strip()
    found = User.query.filter_by(email=email).first()

    if found:
        return jsonify({"msg": "El email ya está en uso"}), 400

    user = User(name=name, email=email, active=active)
    user.hash_password(password)
    user.save()

    return jsonify({"msg": "Usuario registrado correctamente"}), 201


# 🔐 LOGIN
@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    if not email:
        return jsonify({"msg": "El email es obligatorio"}), 400
    if not password:
        return jsonify({"msg": "La contraseña es obligatoria"}), 400

    email = email.lower().strip()
    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Credenciales inválidas"}), 401

    access_token = create_access_token(
        identity=user.id,  # ✅ SIN str()
        additional_claims={
            "email": user.email
        },
        expires_delta=timedelta(days=1)
    )

    return jsonify({"access_token": access_token}), 200


# 👤 PROFILE
@api.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    return jsonify({"profile": user.to_dict()}), 200


# 📋 LIST USERS
@api.route('/users', methods=['GET'])
@jwt_required()
def list_users():
    users = User.query.all()
    return jsonify({"users": [user.to_dict() for user in users]}), 200


# ➕ CREATE USER
@api.route('/users', methods=['POST'])
@jwt_required()
def add_user():
    name = request.json.get('name', "")
    email = request.json.get('email')
    password = request.json.get('password')
    active = request.json.get('active', True)

    if not email:
        return jsonify({"msg": "El email es obligatorio"}), 400
    if not password:
        return jsonify({"msg": "La contraseña es obligatoria"}), 400

    email = email.lower().strip()
    found = User.query.filter_by(email=email).first()

    if found:
        return jsonify({"msg": "El email ya está en uso"}), 400

    user = User(name=name, email=email, active=active)
    user.hash_password(password)
    user.save()

    return jsonify({
        "msg": "Usuario creado correctamente",
        "data": user.to_dict()
    }), 201


# ✏️ UPDATE USER
@api.route('/users/<int:id>', methods=['PUT'])
@jwt_required()
def edit_user(id):
    name = request.json.get('name', "")
    email = request.json.get('email')
    password = request.json.get('password')
    active = request.json.get('active', True)

    if not email:
        return jsonify({"msg": "El email es obligatorio"}), 400

    email = email.lower().strip()
    found = User.query.filter(User.email == email, User.id != id).first()

    if found:
        return jsonify({"msg": "El email ya está en uso"}), 400

    user = User.query.get(id)

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    user.name = name
    user.email = email
    user.active = active

    if password:
        user.hash_password(password)

    user.update()

    return jsonify({
        "msg": "Usuario actualizado correctamente",
        "data": user.to_dict()
    }), 200


# ❌ DELETE USER
@api.route('/users/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):
    user = User.query.get(id)

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    user.delete()

    return jsonify({"msg": "Usuario eliminado correctamente"}), 200
