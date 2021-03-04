<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use App\Models\Product;
use App\Models\Cart_detail;
use App\Models\User;

class Cart extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'carts';

    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    public function costumer()
    {
        return $this->belongsTo(User::class, 'costumer_id');
    }

    public function details()
    {
        return $this->hasMany(Cart_detail::class);
    }

    public function getCreatedAtAttribute($date)
    {
        $carbon = new Carbon($date);
        return $carbon->format('d/M/Y - g:i A');
    }
}
