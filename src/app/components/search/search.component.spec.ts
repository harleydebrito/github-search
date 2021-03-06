import { AppModule } from './../../app.module';
import { TestBed, ComponentFixture, async, fakeAsync, tick, flush, flushMicrotasks } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SearchComponent } from './search.component';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;
    let debugElement: DebugElement;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [ SearchComponent ],
            imports: [ AppModule ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SearchComponent);
            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
            fixture.detectChanges();
        });
    });

    it('o componente deve ser criado', () => {
        expect(component).toBeDefined('O componente deveria ter sido instanciado.');
    });

    it('campo de input deve ser inicializado com valor', () => {
        const input: DebugElement = debugElement.query(By.css('#searchInput'));
        component.fieldValue = 'harleydebrito';
        fixture.detectChanges();
        component.ngOnInit();
        expect(component.searchField.value).toMatch('harleydebrito');
        expect(input.nativeElement.value).toMatch(component.searchField.value);
    });

    it('deve emitir o valor do campo de procura', fakeAsync(() => {
        const onSearchClickedSpy: jasmine.Spy<() => void> = spyOn(component, 'onSearchClicked');
        const input: DebugElement[] = debugElement.queryAll(By.css('#searchInput'));
        const button: DebugElement[] = debugElement.queryAll(By.css('#searchButton'));
        input[0].nativeElement.value = "harleydebrito";
        input[0].nativeElement.dispatchEvent(new Event('input'));
        flush();
        fixture.detectChanges();
        expect(input[0].nativeElement.value).toMatch(component.searchField.value);
        button[0].nativeElement.dispatchEvent(new Event('click'));
        flushMicrotasks();
        expect(onSearchClickedSpy).toHaveBeenCalled();
    }));

    it('onSearchClicked deve ser acionado', fakeAsync(() => {
        const onSearchClickedSpy: jasmine.Spy<() => void> = spyOn(component, 'onSearchClicked').and.callThrough();
        component.onSearchClicked();
        expect(onSearchClickedSpy).toHaveBeenCalled();
    }));
});