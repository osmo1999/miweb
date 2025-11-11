from flask import Flask, render_template, request, jsonify
from numeros_primos import es_primo, mostrar_primos

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calcular', methods=['POST'])
def calcular():
    """
    Endpoint que recibe un número límite y retorna los números primos
    """
    try:
        data = request.json
        limite = int(data.get('limite', 0))
        
        if limite < 2:
            return jsonify({
                'error': 'Por favor ingrese un número mayor o igual a 2',
                'primos': []
            }), 400
        
        primos = mostrar_primos(limite)
        
        return jsonify({
            'exito': True,
            'primos': primos,
            'cantidad': len(primos),
            'limite': limite
        })
        
    except ValueError:
        return jsonify({
            'error': 'Por favor ingrese un número entero válido',
            'primos': []
        }), 400
    except Exception as e:
        return jsonify({
            'error': f'Error: {str(e)}',
            'primos': []
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
