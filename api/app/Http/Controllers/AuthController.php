<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function __construct()
    {
    }

    public function login(Request $request)
    {
        try {
            $rules = array(
                'email' => 'email|required',
                'password' => 'required',
            );

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return response()->json(['status' => 500, 'message' => "Error en el formulario.", 'messageJSON' => $validator]);
            } else {
                $user = User::where('email', '=', $request->email)->first();
                if ($user) {
                    if (Hash::check($request->password, $user->password)) {
                        return response()->json(['status' => 200, 'message' => 'Bienvenido ' . $user->name . ".", 'user' => $user->id]);
                    } else {
                        return response()->json(['status' => 500, 'message' => 'Contraseña incorrecta.']);
                    }
                } else {
                    return response()->json(['status' => 500, 'message' => 'El em@il "' . $request->email . '" no existe.']);
                }
            }
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage() . "."]);
        }
    }
    public function register(Request $request)
    {
        try {
            $rules = array(
                'name' => 'required',
                'email' => 'email|required',
                'password' => 'required',
            );
            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return response()->json(['status' => 500, 'message' => "Error en el formulario.", 'messageJSON' => $validator]);
            } else {
                $user = new User;
                $user->name = $request->name;
                $user->email = $request->email;
                $user->remember_token = Str::random(10);
                $user->email_verified_at = now();
                $user->password = Hash::make($request->password);
                $user->save();
                $cart = new Cart;
                $cart->costumer()->associate($user);
                $cart->save();
                return response()->json(['status' => 200, 'message' => 'Bienvenido ' . $user->name . ".", 'user' => $user->id]);
            }
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage() . "."]);
        }
    }

}
