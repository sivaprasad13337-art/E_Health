from django.db import migrations
from django.db.migrations.state import ModelState


class Migration(migrations.Migration):

    dependencies = [
        ("medical", "0001_initial"),
        ("hospital", "0023_alter_patient_dob_alter_patient_gender"),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            database_operations=[],

            state_operations=[
                migrations.CreateModel(
                    name="Allergy",
                    fields=[
                        (
                            "id",
                            models.BigAutoField(
                                auto_created=True,
                                primary_key=True,
                                serialize=False,
                                verbose_name="ID",
                            ),
                        ),
                        (
                            "allergy",
                            models.CharField(max_length=100),
                        ),
                        (
                            "severity",
                            models.CharField(
                                choices=[
                                    ("Low", "Low"),
                                    ("Moderate", "Moderate"),
                                    ("High", "High"),
                                ],
                                default="Mod",
                                max_length=8,
                            ),
                        ),
                        (
                            "note",
                            models.CharField(max_length=100),
                        ),
                        (
                            "patient",
                            models.ForeignKey(
                                on_delete=django.db.models.deletion.CASCADE,
                                related_name="allergies",
                                to="hospital.patient",
                            ),
                        ),
                    ],
                ),
            ],
        ),
    ]