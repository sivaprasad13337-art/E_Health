# Generated manually for moving models from appointment app to medical app

import django.db.models.deletion
from django.db import migrations, models


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
                        ("allergy", models.CharField(max_length=100)),
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
                        ("note", models.CharField(max_length=100)),
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

                migrations.CreateModel(
                    name="LifeStyleHabit",
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
                        ("smoking", models.CharField(max_length=50)),
                        ("alcohol", models.CharField(max_length=50)),
                        ("activity", models.CharField(max_length=50)),
                        ("diet", models.CharField(max_length=100)),
                        ("sleep", models.CharField(max_length=50)),
                        (
                            "taking_medication",
                            models.CharField(max_length=3),
                        ),
                        (
                            "patient",
                            models.ForeignKey(
                                on_delete=django.db.models.deletion.CASCADE,
                                related_name="life_style_habits",
                                to="hospital.patient",
                            ),
                        ),
                    ],
                ),

                migrations.CreateModel(
                    name="MedicalCondition",
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
                        ("condition", models.CharField(max_length=100)),
                        ("since", models.CharField(max_length=4)),
                        ("management", models.CharField(max_length=100)),
                        ("medication", models.CharField(max_length=100)),
                        (
                            "patient",
                            models.ForeignKey(
                                on_delete=django.db.models.deletion.CASCADE,
                                related_name="medical_conditions",
                                to="hospital.patient",
                            ),
                        ),
                    ],
                ),

                migrations.CreateModel(
                    name="MedicalRecord",
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
                            "medications",
                            models.JSONField(
                                blank=True,
                                default=list,
                            ),
                        ),
                        (
                            "treatment_history",
                            models.TextField(blank=True),
                        ),
                        (
                            "notes",
                            models.TextField(blank=True),
                        ),
                        (
                            "created_at",
                            models.DateTimeField(auto_now_add=True),
                        ),
                        (
                            "updated_at",
                            models.DateTimeField(auto_now=True),
                        ),
                        (
                            "life_style_habits",
                            models.ForeignKey(
                                on_delete=django.db.models.deletion.CASCADE,
                                related_name="life_style_habits",
                                to="medical.lifestylehabit",
                            ),
                        ),
                        (
                            "patient",
                            models.ForeignKey(
                                on_delete=django.db.models.deletion.CASCADE,
                                related_name="medical_record",
                                to="hospital.patient",
                            ),
                        ),
                    ],
                ),

                migrations.CreateModel(
                    name="Surgery",
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
                        ("surgery", models.CharField(max_length=100)),
                        ("reason", models.CharField(max_length=100)),
                        ("date", models.CharField(max_length=30)),
                        ("hospital", models.CharField(max_length=100)),
                        ("notes", models.TextField(null=True)),
                        ("summary", models.TextField(null=True)),
                        (
                            "patient",
                            models.ForeignKey(
                                on_delete=django.db.models.deletion.CASCADE,
                                related_name="surgeries",
                                to="hospital.patient",
                            ),
                        ),
                    ],
                ),
            ],
        ),
    ]