import matplotlib.pyplot as plt
import numpy as np
import base64
from io import BytesIO

def create_emissions_chart():
    # Data for Annual CO₂ Emissions Comparison
    vehicle_types = ['Petrol Car', 'Diesel Car', 'EV (Grid Power)', 'EV (Solar)']
    emissions = [2.7, 2.4, 1.2, 0.1]  # tons CO2/year

    # Create the figure
    plt.figure(figsize=(8, 5))
    bars = plt.bar(vehicle_types, emissions, color=['#dc3545', '#fd7e14', '#28a745', '#17a2b8'])

    plt.title('Annual CO₂ Emissions Comparison', pad=20)
    plt.ylabel('Tons of CO₂ Emissions')
    plt.ylim(0, 3)
    plt.grid(axis='y', linestyle='--', alpha=0.7)

    # Add value labels
    for bar in bars:
        height = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2., height,
                 f'{height} t',
                 ha='center', va='bottom')

    # Save as base64
    buffer = BytesIO()
    plt.savefig(buffer, format='png', bbox_inches='tight', dpi=100)
    plt.close()
    return base64.b64encode(buffer.getvalue()).decode('utf-8')

def create_lifetime_chart():
    # Data for Lifetime Environmental Impact
    categories = ['Manufacturing', 'Operation', 'Maintenance', 'End-of-Life']
    petrol = [5.2, 32.4, 1.8, 0.6]  # tons CO2 over 15 years
    ev_converted = [1.0, 18.0, 1.2, 0.4]  # using existing chassis

    x = np.arange(len(categories))
    width = 0.35

    # Create the figure
    plt.figure(figsize=(8, 5))
    bars1 = plt.bar(x - width/2, petrol, width, label='Petrol Vehicle', color='#dc3545')
    bars2 = plt.bar(x + width/2, ev_converted, width, label='Converted EV', color='#28a745')

    plt.title('Lifetime Environmental Impact (15 years)', pad=20)
    plt.ylabel('Tons of CO₂ Emissions')
    plt.xticks(x, categories)
    plt.legend()
    plt.grid(axis='y', linestyle='--', alpha=0.7)

    # Add value labels
    for bars in [bars1, bars2]:
        for bar in bars:
            height = bar.get_height()
            plt.text(bar.get_x() + bar.get_width()/2., height,
                     f'{height} t',
                     ha='center', va='bottom', fontsize=8)

    # Save as base64
    buffer = BytesIO()
    plt.savefig(buffer, format='png', bbox_inches='tight', dpi=100)
    plt.close()
    return base64.b64encode(buffer.getvalue()).decode('utf-8')

# Generate both charts
emissions_chart = create_emissions_chart()
lifetime_chart = create_lifetime_chart()

# Print the base64 strings to copy into your HTML
print("Emissions Chart Base64:")
print(emissions_chart)
print("\nLifetime Chart Base64:")
print(lifetime_chart)