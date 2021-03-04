<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\User;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;

class CommentController extends Controller
{
    public function __construct()
    {
    }

    public function publish(Request $request)
    {
        try {
            $rules = array(
                'user_id' => 'numeric|required',
                'product_id' => 'numeric|required',
                'content' => 'required'
            );

            $validator = Validator::make($request->all(), $rules);
            

            if ($validator->fails()) {
                return response()->json(['status' => 500, 'message' => "Error en el formulario.", 'messageJSON' => $validator]);
            } else {
                $product = Product::find($request->product_id);
                if (!$product) {
                    return response()->json(['status' => 500, 'message' =>"El product no existe."]);
                }

                $user = User::find($request->user_id);
                if (!$user) {
                    return response()->json(['status' => 500, 'message' =>"El usuario no existe."]);
                }

                $parent = Comment::find($request->parent_id);
                $comment = new Comment;
                $comment->content = $request->content;
                $comment->likes = 0;
                $comment->dislikes = 0;
                $comment->user()->associate($user);
                $comment->product()->associate($product);
                $comment->parent()->associate($parent);
                $comment->save();
                $comment = Comment::join('users', 'users.id', '=', 'comments.user_id')
                ->select('comments.*', 'users.name', 'users.profile')->whereNull('comments.parent_id')->where("comments.id", "=", $comment->id)->first();
                return response()->json(['status' => 200, 'message' => "El comentario ha sido publicado.", "comment"=>$comment]);
            }
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()."."]);
        }
    }

    public function delete(Request $request)
    {
        try {
            $rules = array(
                'id' => 'numeric|required'
            );

            $validator = Validator::make($request->all(), $rules);
            

            if ($validator->fails()) {
                return response()->json(['status' => 500, 'message' => "Error en el formulario.", 'messageJSON' => $validator]);
            } else {
                $comment = Comment::find($request->id);

                if (!$comment) {
                    return response()->json(['status' => 500, 'message' =>"El comentario no existe."]);
                }
      
                $comment->delete();
                return response()->json(['status' => 200, 'message' => "El comentario \"".$comment->nombre."\" ha sido eliminado.", 'comment' => $comment->id]);
            }
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()."."]);
        }
    }

    public function like(Request $request)
    {
        try {
            $rules = array(
                'id' => 'numeric|required',
            );

            $validator = Validator::make($request->all(), $rules);
            

            if ($validator->fails()) {
                return response()->json(['status' => 500, 'message' => "Error en el formulario.", 'messageJSON' => $validator]);
            } else {
                $comment = Comment::find($request->id);
                if (!$comment) {
                    return response()->json(['status' => 500, 'message' =>"El comentario no existe."]);
                }

                $comment->likes++;
                $comment->save();
                return response()->json(['status' => 200, 'message' => "Like al comentario."]);
            }
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()."."]);
        }
    }

    public function dislike(Request $request)
    {
        try {
            $rules = array(
                'id' => 'numeric|required',
            );

            $validator = Validator::make($request->all(), $rules);
            

            if ($validator->fails()) {
                return response()->json(['status' => 500, 'message' => "Error en el formulario.", 'messageJSON' => $validator]);
            } else {
                $comment = Comment::find($request->id);
                if (!$comment) {
                    return response()->json(['status' => 500, 'message' =>"El comentario no existe."]);
                }

                $comment->dislikes++;
                $comment->save();
                return response()->json(['status' => 200, 'message' => "Dislike al comentario."]);
            }
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()."."]);
        }
    }
}
