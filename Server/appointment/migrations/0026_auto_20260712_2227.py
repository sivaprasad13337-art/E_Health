from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("appointment", "0025_medicalreport_status"),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            database_operations=[],

            state_operations=[
                migrations.RemoveField(
                    model_name="lifestylehabit",
                    name="patient",
                ),
                migrations.RemoveField(
                    model_name="medicalrecord",
                    name="life_style_habits",
                ),
                migrations.RemoveField(
                    model_name="medicalcondition",
                    name="patient",
                ),
                migrations.RemoveField(
                    model_name="medicalrecord",
                    name="patient",
                ),
                migrations.RemoveField(
                    model_name="surgery",
                    name="patient",
                ),
                migrations.DeleteModel(
                    name="Allergy",
                ),
                migrations.DeleteModel(
                    name="LifeStyleHabit",
                ),
                migrations.DeleteModel(
                    name="MedicalCondition",
                ),
                migrations.DeleteModel(
                    name="MedicalRecord",
                ),
                migrations.DeleteModel(
                    name="Surgery",
                ),
            ],
        ),
    ]