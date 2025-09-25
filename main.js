package package;

import android.animation.*;
import android.app.*;
import android.content.*;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.res.*;
import android.graphics.*;
import android.graphics.drawable.*;
import android.media.*;
import android.net.*;
import android.os.*;
import android.speech.tts.TextToSpeech;
import android.text.*;
import android.text.Editable;
import android.text.TextWatcher;
import android.text.style.*;
import android.util.*;
import android.view.*;
import android.view.View;
import android.view.View.*;
import android.view.animation.*;
import android.webkit.*;
import android.widget.*;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.BaseAdapter;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;
import androidx.annotation.*;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.coordinatorlayout.widget.CoordinatorLayout;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.DialogFragment;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import com.google.android.material.appbar.AppBarLayout;
import java.io.*;
import java.text.*;
import java.util.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.regex.*;
import org.json.*;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import org.json.JSONObject;
import java.net.*;
import java.io.*;
import org.json.*;


public class MainActivity extends AppCompatActivity {
	
	private Toolbar _toolbar;
	private AppBarLayout _app_bar;
	private CoordinatorLayout _coordinator;
	private DrawerLayout _drawer;
	private String msg = "";
	private double scroll = 0;
	private String i = "";
	private String resultado = "";
	private String api = "";
	
	private ArrayList<HashMap<String, Object>> text = new ArrayList<>();
	private ArrayList<String> BotOrPerson = new ArrayList<>();
	
	private LinearLayout linear1;
	private ListView listview1;
	private LinearLayout linear2;
	private EditText edittext1;
	private ImageView imageview2;
	private LinearLayout _drawer_linear3;
	private LinearLayout _drawer_linear1;
	private LinearLayout _drawer_linear4;
	private LinearLayout _drawer_linear2;
	private TextView _drawer_textview1;
	private ImageView _drawer_imageview1;
	private LinearLayout _drawer_linear5;
	private ImageView _drawer_imageview2;
	private TextView _drawer_textview2;
	
	private TextToSpeech a;
	private RequestNetwork issa;
	private RequestNetwork.RequestListener _issa_request_listener;
	
	@Override
	protected void onCreate(Bundle _savedInstanceState) {
		super.onCreate(_savedInstanceState);
		setContentView(R.layout.main);
		initialize(_savedInstanceState);
		initializeLogic();
	}
	
	private void initialize(Bundle _savedInstanceState) {
		_app_bar = findViewById(R.id._app_bar);
		_coordinator = findViewById(R.id._coordinator);
		_toolbar = findViewById(R.id._toolbar);
		setSupportActionBar(_toolbar);
		getSupportActionBar().setDisplayHomeAsUpEnabled(true);
		getSupportActionBar().setHomeButtonEnabled(true);
		_toolbar.setNavigationOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View _v) {
				onBackPressed();
			}
		});
		_drawer = findViewById(R.id._drawer);
		ActionBarDrawerToggle _toggle = new ActionBarDrawerToggle(MainActivity.this, _drawer, _toolbar, R.string.app_name, R.string.app_name);
		_drawer.addDrawerListener(_toggle);
		_toggle.syncState();
		
		LinearLayout _nav_view = findViewById(R.id._nav_view);
		
		linear1 = findViewById(R.id.linear1);
		listview1 = findViewById(R.id.listview1);
		linear2 = findViewById(R.id.linear2);
		edittext1 = findViewById(R.id.edittext1);
		imageview2 = findViewById(R.id.imageview2);
		_drawer_linear3 = _nav_view.findViewById(R.id.linear3);
		_drawer_linear1 = _nav_view.findViewById(R.id.linear1);
		_drawer_linear4 = _nav_view.findViewById(R.id.linear4);
		_drawer_linear2 = _nav_view.findViewById(R.id.linear2);
		_drawer_textview1 = _nav_view.findViewById(R.id.textview1);
		_drawer_imageview1 = _nav_view.findViewById(R.id.imageview1);
		_drawer_linear5 = _nav_view.findViewById(R.id.linear5);
		_drawer_imageview2 = _nav_view.findViewById(R.id.imageview2);
		_drawer_textview2 = _nav_view.findViewById(R.id.textview2);
		a = new TextToSpeech(getApplicationContext(), null);
		issa = new RequestNetwork(this);
		
		listview1.setOnScrollListener(new AbsListView.OnScrollListener() {
			@Override
			public void onScrollStateChanged(AbsListView abs, int _scrollState) {
				
			}
			
			@Override
			public void onScroll(AbsListView abs, int _firstVisibleItem, int _visibleItemCount, int _totalItemCount) {
				
			}
		});
		
		listview1.setOnItemLongClickListener(new AdapterView.OnItemLongClickListener() {
			@Override
			public boolean onItemLongClick(AdapterView<?> _param1, View _param2, int _param3, long _param4) {
				final int _position = _param3;
				
				return true;
			}
		});
		
		linear2.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View _view) {
				
			}
		});
		
		edittext1.addTextChangedListener(new TextWatcher() {
			@Override
			public void onTextChanged(CharSequence _param1, int _param2, int _param3, int _param4) {
				final String _charSeq = _param1.toString();
				if (_charSeq.equals("")) {
					imageview2.setColorFilter(0xFF9E9E9E, PorterDuff.Mode.MULTIPLY);
					imageview2.setEnabled(false);
				}
				else {
					imageview2.setColorFilter(0xFFFFFFFF, PorterDuff.Mode.MULTIPLY);
					imageview2.setEnabled(true);
				}
			}
			
			@Override
			public void beforeTextChanged(CharSequence _param1, int _param2, int _param3, int _param4) {
				
			}
			
			@Override
			public void afterTextChanged(Editable _param1) {
				
			}
		});
		
		imageview2.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View _view) {
				_send(edittext1.getText().toString());
			}
		});
		
		_issa_request_listener = new RequestNetwork.RequestListener() {
			@Override
			public void onResponse(String _param1, String _param2, HashMap<String, Object> _param3) {
				final String _tag = _param1;
				final String _response = _param2;
				final HashMap<String, Object> _responseHeaders = _param3;
				if (edittext1.getText().toString().equals("widget api == %-skProj();")) {
					_sendBot("<code>iaOpenAI(módulo) {\n  api.url = \"https://api.openai.com/v1/chat/completions\"\n  api.key = \"sk-proj-\" + api.java.cn // Reemplaza con tu clave real\n\n  api.headers = {\n    \"Authorization\": \"Bearer \" + api.key,\n    \"Content-Type\": \"application/json\"\n  }\n\n  api.body = {\n    model: \"gpt-3.5-turbo\",\n    messages: [{ role: \"user\", content: view.input }]\n  }\n\n  api.send(api.url, api.headers, api.body)\n\n  view.respuesta = api.response(\"choices[0].message.content\")\n  sendBot(view.respuesta)\n}</code>");
					edittext1.setEnabled(true);
					edittext1.setText("");
				}
				else {
					new Thread(new Runnable() {
						    @Override
						    public void run() {
							        try {
								            URL url = new URL("https://api.openai.com/v1/chat/completions");
								            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
								            conn.setRequestMethod("POST");
								            conn.setRequestProperty("Authorization", "Bearer " + api);
								            conn.setRequestProperty("Content-Type", "application/json");
								            conn.setDoOutput(true);
								
								            String json = "{\n" +
								                "  \"model\": \"gpt-3.5-turbo\",\n" +
								                "  \"messages\": [\n" +
								                "    {\"role\": \"user\", \"content\": \"Hola IA, ¿cómo estás?\"}\n" +
								                "  ]\n" +
								                "}";
								
								            OutputStream os = conn.getOutputStream();
								            os.write(json.getBytes("UTF-8"));
								            os.close();
								
								            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
								            StringBuilder respuestaBuilder = new StringBuilder();
								            String linea;
								            while ((linea = br.readLine()) != null) {
									                respuestaBuilder.append(linea);
									            }
								            br.close();
								
								            final String respuestaJson = respuestaBuilder.toString();
								
								            runOnUiThread(new Runnable() {
									                @Override
									                public void run() {
										                    try {
											                        JSONObject jsonObject = new JSONObject(respuestaJson);
											                        JSONArray choices = jsonObject.getJSONArray("choices");
											                        String textoIA = choices.getJSONObject(0).getJSONObject("message").getString("content");
											                        _sendBot(textoIA); // Tu método para mostrar la respuesta
											                        edittext1.setEnabled(true);
											                        edittext1.setText("");
											                    } catch (Exception ex) {
											                        _sendBot("Error al parsear: " + ex.toString());
											                    edittext1.setEnabled(true);
											                    edittext1.setText("");
											                    }
										                }
									            });
								
								        } catch (Exception e) {
								            final String errorTexto = "Error de conexión: " + e.toString();
								            runOnUiThread(new Runnable() {
									                @Override
									                public void run() {
										                    _sendBot(errorTexto);
										                    edittext1.setEnabled(true);
										                    edittext1.setText("");
										                }
									            });
								        }
							    }
					}).start();
				}
			}
			
			@Override
			public void onErrorResponse(String _param1, String _param2) {
				final String _tag = _param1;
				final String _message = _param2;
				edittext1.setEnabled(true);
				SketchwareUtil.showMessage(getApplicationContext(), _tag + ":" + _message);
			}
		};
	}
	
	private void initializeLogic() {
		_reset();
		_sendBot("How can I help you today?");
		_drawer_linear5.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View _view) {
				text.clear();
				BotOrPerson.clear();
				_reset();
				_sendBot("How can I help you today?");
			}
		});
	}
	
	
	@Override
	public void onBackPressed() {
		if (_drawer.isDrawerOpen(GravityCompat.START)) {
			_drawer.closeDrawer(GravityCompat.START);
		} else {
			super.onBackPressed();
		}
	}
	public void _send(final String _msg) {
		{
			HashMap<String, Object> _item = new HashMap<>();
			_item.put("txt", _msg);
			text.add(_item);
		}
		
		BotOrPerson.add("prs");
		edittext1.setEnabled(false);
		_reset();
		_sendToIA();
	}
	
	
	public void _reset() {
		listview1.setAdapter(new Listview1Adapter(text));
		((BaseAdapter)listview1.getAdapter()).notifyDataSetChanged();
		listview1.setSelection((int)text.size());
	}
	
	
	public void _sendBot(final String _msg) {
		{
			HashMap<String, Object> _item = new HashMap<>();
			_item.put("txt", _msg);
			text.add(_item);
		}
		
		BotOrPerson.add("bot");
		_reset();
	}
	
	
	public void _sendToIA() {
		issa.startRequestNetwork(RequestNetworkController.GET, "https://www.google.com/", "internet", _issa_request_listener);
	}
	
	public class Listview1Adapter extends BaseAdapter {
		
		ArrayList<HashMap<String, Object>> _data;
		
		public Listview1Adapter(ArrayList<HashMap<String, Object>> _arr) {
			_data = _arr;
		}
		
		@Override
		public int getCount() {
			return _data.size();
		}
		
		@Override
		public HashMap<String, Object> getItem(int _index) {
			return _data.get(_index);
		}
		
		@Override
		public long getItemId(int _index) {
			return _index;
		}
		
		@Override
		public View getView(final int _position, View _v, ViewGroup _container) {
			LayoutInflater _inflater = getLayoutInflater();
			View _view = _v;
			if (_view == null) {
				_view = _inflater.inflate(R.layout.msg, null);
			}
			
			final LinearLayout cotainer = _view.findViewById(R.id.cotainer);
			final ImageView botOrPerson = _view.findViewById(R.id.botOrPerson);
			final LinearLayout linear1 = _view.findViewById(R.id.linear1);
			final LinearLayout input = _view.findViewById(R.id.input);
			final LinearLayout linear2 = _view.findViewById(R.id.linear2);
			final TextView textview1 = _view.findViewById(R.id.textview1);
			final ImageView imageview2 = _view.findViewById(R.id.imageview2);
			final ImageView imageview4 = _view.findViewById(R.id.imageview4);
			
			GradientDrawable thisInput = new GradientDrawable();
			thisInput.setColor(Color.parseColor("#505151")); // Fondo
			thisInput.setStroke(0, Color.parseColor("#000000")); // Borde
			thisInput.setCornerRadius(20); // Radio
			
			input.setBackground(thisInput);
			String tipo = BotOrPerson.get((int) _position);
			String mensaje = text.get((int) _position).get("txt").toString();
			
			textview1.setText(mensaje);
			
			if ("prs".equals(tipo)) {
				    botOrPerson.setImageResource(R.drawable.person);
			} else if ("bot".equals(tipo)) {
				    botOrPerson.setImageResource(R.drawable.computer);
			} else {
			}
			imageview2.setOnClickListener(new View.OnClickListener() {
				@Override
				public void onClick(View _view) {
					((ClipboardManager) getSystemService(getApplicationContext().CLIPBOARD_SERVICE)).setPrimaryClip(ClipData.newPlainText("clipboard", textview1.getText().toString()));
				}
			});
			imageview4.setOnClickListener(new View.OnClickListener() {
				@Override
				public void onClick(View _view) {
					a.stop();
					if (textview1.getText().toString().equals("pendejo")) {
						a.speak("lo siento error: \"local% = (local.grs.list)", TextToSpeech.QUEUE_ADD, null);
					}
					else {
						a.speak(textview1.getText().toString(), TextToSpeech.QUEUE_ADD, null);
					}
				}
			});
			String textoOriginal = textview1.getText().toString();
			
			// Detectar y extraer bloques <code>...</code>
			Pattern pattern = Pattern.compile("<code>(.*?)</code>", Pattern.DOTALL);
			Matcher matcher = pattern.matcher(textoOriginal);
			
			// Crear un nuevo texto sin etiquetas
			StringBuilder textoLimpio = new StringBuilder(textoOriginal);
			SpannableString spannable;
			
			while (matcher.find()) {
				    String contenido = matcher.group(1);
				    int start = matcher.start();
				    int end = matcher.end();
				
				    // Reemplazar el bloque completo por solo el contenido
				    textoLimpio.replace(start, end, contenido);
				
				    // Ajustar el matcher al nuevo texto
				    matcher = pattern.matcher(textoLimpio.toString());
			}
			
			// Crear el Spannable con el texto limpio
			spannable = new SpannableString(textoLimpio.toString());
			
			// Aplicar resaltado a cada bloque <code>
			matcher = pattern.matcher(textoOriginal); // Usamos el original para encontrar posiciones reales
			while (matcher.find()) {
				    String contenido = matcher.group(1);
				    int start = textoLimpio.indexOf(contenido);
				    int end = start + contenido.length();
				
				    spannable.setSpan(
				        new BackgroundColorSpan(Color.parseColor("#80CCCCCC")),
				        start,
				        end,
				        Spannable.SPAN_EXCLUSIVE_EXCLUSIVE
				    );
			}
			
			textview1.setText(spannable);
			
			return _view;
		}
	}
	
	@Deprecated
	public void showMessage(String _s) {
		Toast.makeText(getApplicationContext(), _s, Toast.LENGTH_SHORT).show();
	}
	
	@Deprecated
	public int getLocationX(View _v) {
		int _location[] = new int[2];
		_v.getLocationInWindow(_location);
		return _location[0];
	}
	
	@Deprecated
	public int getLocationY(View _v) {
		int _location[] = new int[2];
		_v.getLocationInWindow(_location);
		return _location[1];
	}
	
	@Deprecated
	public int getRandom(int _min, int _max) {
		Random random = new Random();
		return random.nextInt(_max - _min + 1) + _min;
	}
	
	@Deprecated
	public ArrayList<Double> getCheckedItemPositionsToArray(ListView _list) {
		ArrayList<Double> _result = new ArrayList<Double>();
		SparseBooleanArray _arr = _list.getCheckedItemPositions();
		for (int _iIdx = 0; _iIdx < _arr.size(); _iIdx++) {
			if (_arr.valueAt(_iIdx))
			_result.add((double)_arr.keyAt(_iIdx));
		}
		return _result;
	}
	
	@Deprecated
	public float getDip(int _input) {
		return TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, _input, getResources().getDisplayMetrics());
	}
	
	@Deprecated
	public int getDisplayWidthPixels() {
		return getResources().getDisplayMetrics().widthPixels;
	}
	
	@Deprecated
	public int getDisplayHeightPixels() {
		return getResources().getDisplayMetrics().heightPixels;
	}
}
