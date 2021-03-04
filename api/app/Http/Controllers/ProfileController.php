<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Product;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function __construct()
    {
    }
    public function info($id)
    {
        try {
            $auth = User::find($id);
            if (!$auth) {
                return response()->json(array("status" => 500, "message" => "El usuario no existe."));
            }
            $products = Product::join('users', 'users.id', '=', 'products.seller_id')
                ->select('products.id','products.seller_id','products.name','products.img','products.created_at', 'users.name AS user_name', 'users.profile')->where("seller_id", "=", $auth->id)->orderBy('created_at', 'desc')->get();

            return response()->json(
                ["status" => 200, "user" => $auth, "products" => $products],
                200,
                [],
                JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT
            );
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage() . "."]);
        }
    }

    public function update(Request $request)
    {
        try {
            $user = User::find($request->user_id);
            if (!$user) {
                return response()->json(['status' => 500, 'message' => "El usuario no existe."]);
            }
            if ($request->bio) {
                $user->bio = $request->bio;
            }
            if ($request->hasFile('banner')) {
                $file = $request->file('banner');
                $user->banner = $request->user_id . '_' . $file->getClientOriginalName();
                $file->move(base_path('\public\banner'), $user->banner);
                $user->banner = $request->getSchemeAndHttpHost() . "/banner/" . $user->banner;
            }
            if ($request->hasFile('profile')) {
                $file = $request->file('profile');
                $user->profile = $request->user_id . '_' . $file->getClientOriginalName();
                $file->move(base_path('\public\profile'), $user->profile);
                $user->profile = $request->getSchemeAndHttpHost() . "/profile/" . $user->profile;
            }

            $user->save();
            return response()->json(['status' => 200, 'message' => "El usuario \"" . $user->name . "\" ha sido actualizado."]);
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage() . "."]);
        }
    }
}
