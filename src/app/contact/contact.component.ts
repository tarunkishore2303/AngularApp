import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut } from '../animations/app.animation';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display:block;',
  },
  animations: [flyInOut()],
})
export class ContactComponent implements OnInit {
  feedBackForm: FormGroup;
  feedback: Feedback;
  contacttype = ContactType;
  @ViewChild('fform') feedbackFormDirective;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.feedBackForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      telnum: [0, Validators.required],
      email: ['', Validators.required],
      agree: false,
      contacttype: 'none',
      message: '',
    });
  }

  onSubmit() {
    this.feedback = this.feedBackForm.value;
    console.log(this.feedback);
    this.feedBackForm.reset({
      firstName: '',
      lastName: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'none',
      message: '',
    });
    this.feedbackFormDirective.resetForm();
  }
}
