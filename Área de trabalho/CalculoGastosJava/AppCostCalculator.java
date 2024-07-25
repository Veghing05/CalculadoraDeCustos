import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.text.DecimalFormat;

public class AppCostCalculator {

    private static String formatarValor(double valor) {
        DecimalFormat df = new DecimalFormat("R$ #,##0.00");
        return df.format(valor);
    }

    public static void createAndShowGUI() {
        JFrame frame = new JFrame("Calculadora de Custo");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(500, 400);

        JPanel panel = new JPanel(new GridBagLayout());
        panel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(5, 5, 5, 5);

        // Cria os componentes
        JLabel labelHome = new JLabel("Informe os detalhes do carro alugado:");
        JLabel labelRent = new JLabel("Valor do aluguel mensal:");
        JTextField textRent = new JTextField();

        JLabel labelKm = new JLabel("Quilômetros rodados mensal:");
        JTextField textKm = new JTextField();

        JLabel labelFuelType = new JLabel("Tipo de Combustível:");
        JComboBox<String> comboFuelType = new JComboBox<>(new String[]{"Álcool", "Gasolina"});

        JLabel labelFuelConsumption = new JLabel("Consumo do Combustível (km/l):");
        JTextField textFuelConsumption = new JTextField();

        JLabel labelFuelPrice = new JLabel("Preço do Combustível (por litro):");
        JTextField textFuelPrice = new JTextField();

        JLabel labelDesiredProfit = new JLabel("Lucro desejado:");
        JTextField textDesiredProfit = new JTextField();

        // Caixa de texto para mostrar a mensagem
        JTextArea textAreaMessage = new JTextArea();
        textAreaMessage.setEditable(false);
        textAreaMessage.setLineWrap(true);
        textAreaMessage.setWrapStyleWord(true);
        JScrollPane scrollPane = new JScrollPane(textAreaMessage);
        scrollPane.setPreferredSize(new Dimension(400, 150)); // Ajuste o tamanho do scroll pane

        JButton buttonCalculate = new JButton("Calcular Custo");
        buttonCalculate.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    double rent = Double.parseDouble(textRent.getText());
                    double km = Double.parseDouble(textKm.getText());
                    double fuelConsumption = Double.parseDouble(textFuelConsumption.getText());
                    double fuelPrice = Double.parseDouble(textFuelPrice.getText());
                    double desiredProfit = Double.parseDouble(textDesiredProfit.getText());

                    // Calcula o custo do combustível
                    double totalFuelCost = (km / fuelConsumption) * fuelPrice;
                    double totalCost = rent + totalFuelCost;

                    // Calcula o custo por quilômetro
                    double costPerKm = totalCost / km;

                    // Calcula a tarifa mínima para obter o lucro desejado
                    double minFare = (totalCost + desiredProfit) / km;
                    double profitPerKm = minFare - costPerKm;

                    // Cria a mensagem informativa
                    String message = String.format(
                            "Para obter o lucro mensal desejado de: %s\n" +
                                    "O Custo mensal: %s\n" +
                                    "Custo por quilômetro: %s\n" +
                                    "Com base nas informações fornecidas, para obter um lucro líquido de %s, rodando %.0f quilômetros no mês, " +
                                    "você deve aceitar viagens com tarifas de, no mínimo, %s.\n" +
                                    "Aceitando valores superiores a este, seu lucro por quilômetro será de %s.",
                            formatarValor(desiredProfit),
                            formatarValor(totalCost),
                            formatarValor(costPerKm),
                            formatarValor(desiredProfit),
                            km,
                            formatarValor(minFare),
                            formatarValor(profitPerKm)
                    );

                    textAreaMessage.setText(message);
                } catch (NumberFormatException ex) {
                    textAreaMessage.setText("Por favor, insira valores válidos.");
                }
            }
        });

        // Adicione os componentes ao painel com GridBagLayout
        gbc.gridx = 0;
        gbc.gridy = 0;
        gbc.gridwidth = 2;
        panel.add(labelHome, gbc);

        gbc.gridy++;
        gbc.gridwidth = 1;
        panel.add(labelRent, gbc);
        gbc.gridx = 1;
        panel.add(textRent, gbc);

        gbc.gridx = 0;
        gbc.gridy++;
        panel.add(labelKm, gbc);
        gbc.gridx = 1;
        panel.add(textKm, gbc);

        gbc.gridx = 0;
        gbc.gridy++;
        panel.add(labelFuelType, gbc);
        gbc.gridx = 1;
        panel.add(comboFuelType, gbc);

        gbc.gridx = 0;
        gbc.gridy++;
        panel.add(labelFuelConsumption, gbc);
        gbc.gridx = 1;
        panel.add(textFuelConsumption, gbc);

        gbc.gridx = 0;
        gbc.gridy++;
        panel.add(labelFuelPrice, gbc);
        gbc.gridx = 1;
        panel.add(textFuelPrice, gbc);

        gbc.gridx = 0;
        gbc.gridy++;
        panel.add(labelDesiredProfit, gbc);
        gbc.gridx = 1;
        panel.add(textDesiredProfit, gbc);

        gbc.gridx = 0;
        gbc.gridy++;
        gbc.gridwidth = 2;
        panel.add(buttonCalculate, gbc);

        gbc.gridy++;
        panel.add(scrollPane, gbc);

        // Adicione o painel ao frame
        frame.add(panel);

        // Exiba o frame
        frame.setVisible(true);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(AppCostCalculator::createAndShowGUI);
    }
}
